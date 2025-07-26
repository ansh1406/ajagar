let pyodide;

async function createPythonWrapper(config) {
  const {
    codeArea,
    inputArea,
    inputBufferArea,
    outputArea,
    errorArea,
    keywordList,
  } = config;
  let inputBuffer = [];

  inputArea.addEventListener("input", () => {
    let currentInputBuffer = inputArea.value.split("\n");
    if (currentInputBuffer.length > 1) {
      currentInputBuffer = currentInputBuffer.filter(
        (line) => line.trim() !== ""
      );
      inputBuffer.push(...currentInputBuffer);
      inputArea.value = "";
    }
    updateBuffer();
  });

  function updateBuffer() {
    if (inputBuffer.length > 0) {
      inputBufferArea.value = inputBuffer.join("\n");
    } else {
      inputBufferArea.value = "";
    }
  }

  async function preLoadPyodide() {
    const pyodideInstance = await loadPyodide();
    pyodideInstance.setStdin({ stdin: stdin });
    pyodideInstance.setStdout({ write: (out) => stdout(out) });
    pyodideInstance.setStderr({ write: (err) => stderr(err) });
    pyodide = pyodideInstance;
  }

  const stdin = () => {
    if (inputBuffer.length === 0) {
      const userInput = prompt("Input required:");
      if (userInput !== null) {
        outputArea.textContent += userInput + "\n";
        return userInput;
      }
      return "";
    }
    outputArea.textContent += inputBuffer[0] + "\n";
    const inputValue =  inputBuffer.shift();
    updateBuffer();
    return inputValue;
  };

  const stdout = (out) => {
    outputArea.textContent += new TextDecoder().decode(out);
    return out.length;
  };

  const stderr = (err) => {
    errorArea.textContent += new TextDecoder().decode(err) + "\n";
    return err.length;
  };

  function intermediateGenerator(sourceCode, keywordList) {
    const lines = sourceCode.split("\n");
    let intermediateCode = "";

    for (let line of lines) {
      if (line.trim() === "") continue;
      let modifiedLine = line;
      for (let keyword of Object.keys(keywordList)) {
        const regex = new RegExp(
          `(?<!\\p{L})${keyword}(?!\\p{L})(?=(?:[^"'']*["'][^"'']*["'])*[^"'']*$)`,
          "g"
        );
        modifiedLine = modifiedLine.replace(regex, keywordList[keyword]);
      }

      intermediateCode += modifiedLine + "\n";
    }
    return intermediateCode;
  }

  await new Promise((resolve) => {
    const load = () => {
      preLoadPyodide()
        .then(() => {
          console.log("Pyodide is ready!");
          resolve();
        })
        .catch((error) => {
          console.error(`Error loading Pyodide: ${error}`);
          resolve();
        });
    };

    if (document.readyState === "complete") {
      load();
    } else {
      window.addEventListener("load", load, { once: true });
    }
  });

  return {
    runCode: async () => {
      errorArea.innerHTML = "";
      try {
        outputArea.textContent = "";
        await pyodide.runPythonAsync(
          intermediateGenerator(codeArea.value, keywordList)
        );
      } catch (error) {
        errorArea.innerHTML = `Error: ${error}`;
      }
    }
  };
}

export { createPythonWrapper };

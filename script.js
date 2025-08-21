import { createPythonWrapper } from "./wrapper.js";

const codeArea = document.getElementById("code");
const inputArea = document.getElementById("input");
const inputBufferArea = document.getElementById("inputBuffer");
const runButton = document.getElementById("run");
const outputArea = document.getElementById("output");
const errorArea = document.getElementById("error");
const saveButton = document.getElementById("save");
const openButton = document.getElementById("open");
const clearButton = document.getElementById("clear");

const keywordList = {
  असत्य: "False",
  कुछनहीं: "None",
  सत्य: "True",
  और: "and",
  केरूपमें: "as",
  दावा: "assert",
  अतुल्यकालिक: "async",
  प्रतीक्षा: "await",
  रुको: "break",
  वर्ग: "class",
  चालू: "continue",
  परिभाषित: "def",
  हटाओ: "del",
  अन्यथाअगर: "elif",
  अन्यथा: "else",
  केअलावा: "except",
  अंतमें: "finally",
  केलिए: "for",
  से: "from",
  वैश्विक: "global",
  अगर: "if",
  आयात: "import",
  में: "in",
  है: "is",
  छोटू: "lambda",
  विदेशी: "nonlocal",
  नहीं: "not",
  या: "or",
  जानेदो: "pass",
  उठाओ: "raise",
  लौटाओ: "return",
  प्रयास: "try",
  जबतक: "while",
  केसाथ: "with",
  फल: "yield",
  मुद्रण: "print",
  प्रविष्टि: "input",
  लम्बाई: "len",
  वाक्य: "str",
  सूची: "list",
  कोश: "dict",
  संग्रह: "set",
  टपल: "tuple",
  संकेत: "ord",
  अक्षर: "chr",
  अंत: "end",
  फ: "f",
  पूर्ण: "int",
  दशमलव: "float",
  बूलियन: "bool",
  सीमा: "range",
  गिनती: "count",
};

const overlay = document.getElementById("overlay");

const pythonWrapper = await createPythonWrapper({
  codeArea: codeArea,
  inputArea: inputArea,
  inputBufferArea: inputBufferArea,
  outputArea: outputArea,
  errorArea: errorArea,
  keywordList: keywordList,
}).then((wrapper) => {
  document.body.removeChild(overlay);
  return wrapper;
});

document.body.addEventListener("keydown", (event) => {
  if (event.key.toLocaleLowerCase() === "r" && event.ctrlKey) {
    event.preventDefault();
    runButton.click();
  }
});

document.body.addEventListener("keydown", (event)=>{
    if(event.key.toLocaleLowerCase() === "s" && event.ctrlKey) {
        event.preventDefault();
        saveButton.click();
    }
});

document.body.addEventListener("keydown", (event)=>{
    if(event.key.toLocaleLowerCase() === "o" && event.ctrlKey) {
        event.preventDefault();
        openButton.click();
    }
});

runButton.addEventListener("click", async () => {
  pythonWrapper.runCode(codeArea.value);
});

saveButton.addEventListener("click", () => {
  const code = codeArea.value;
  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  let name = window.prompt("Enter file name:", "script.hpy");
  if (name === null || name.trim() === "") {
    return;
  }
  if (name.endsWith(".hpy") === false) {
    name += ".hpy";
  }
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
});

openButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".hpy";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        codeArea.value = e.target.result;
      };
      reader.readAsText(file);
    }
  };
  input.click();
});

clearButton.addEventListener("click", () => {
  codeArea.value = "";
  inputArea.value = "";
  outputArea.textContent = "";
  errorArea.textContent = "";
});

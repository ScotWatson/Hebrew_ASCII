/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const initPageTime = performance.now();

const loadSequenceModule = import("https://scotwatson.github.io/Sequence/Sequence.mjs");
const loadUnicodeModule = import("https://scotwatson.github.io/Unicode/Unicode.mjs");
const loadHebrewModule = import("https://scotwatson.github.io/Hebrew_ASCII/Hebrew.mjs");

loadSequenceModule.then(function (module) {
  console.log(Object.getOwnPropertyNames(module));
}, console.error);

loadUnicodeModule.then(function (module) {
  console.log(Object.getOwnPropertyNames(module));
}, console.error);

loadHebrewModule.then(function (module) {
  console.log(Object.getOwnPropertyNames(module));
}, console.error);

const loadWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

Promise.all( [ loadWindow, loadSequenceModule, loadUnicodeModule, loadHebrewModule ] ).then(start, fail);

function start( [ windowEvt, sequenceModule, unicodeModule, hebrewModule ] ) {
  const UnicodeString = sequenceModule(unicodeModule.UnicodeCharacter);
  
  const btnHebrewInput = document.createElement("button");
  btnHebrewInput.innerHTML = "Hebrew Input File";
  btnHebrewInput.addEventListener("click", function (evt) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("input", function (evt) {
      readFile(evt.target.files[0]);
    });
  });
  const decoder = new TextDecoder();
  function readFile(file) {
    file.arrayBuffer().then(decoder.decode);
  }
}

function fail() {
}

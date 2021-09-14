// default.js 進行初始化設定

const RATIO = 2;
let WIDTH, HEIGHT;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let lineCap = ['butt', 'round', 'square'];
let lineJoin = ['round','bevel','miter'];

// resize('#game-box', canvas, context, '#000000');

// 設定音訊
let AudioContext = window.AudioContext || window.webkitAudioContext; //相容性
let audioCtx = new AudioContext();

// 創建節點
let audio = document.querySelector("#Music");
let source = audioCtx.createMediaElementSource(audio);
let gainNode = audioCtx.createGain();
let analyserNode = audioCtx.createAnalyser();
// 連接節點
source.connect(gainNode);
gainNode.connect(analyserNode);
analyserNode.connect(audioCtx.destination);
// 對每個節點進行設定
gainNode.gain.value = 1;
analyserNode.fftSize = 2048;
let bufferLength = analyserNode.frequencyBinCount;
let dataArray = {'pre': new Uint8Array(bufferLength).fill(0),
                 'next': new Uint8Array(bufferLength).fill(0),
                 'delta': new Uint8Array(bufferLength).fill(0),
                 'volume': new Array(bufferLength).fill(0),
                 'pulse':  new Array(bufferLength).fill(0)};
let dataIndex = {'volume': 0};
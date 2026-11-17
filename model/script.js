const MODEL_URL = new URL("./model/ML project for LIS 500/", document.baseURI);

let model;
let cameraStream;
let cameraRunning = false;
let predictionFrame;

const startButton = document.getElementById("startCameraBtn");
const stopButton = document.getElementById("stopCameraBtn");
const camera = document.getElementById("camera");
const status = document.getElementById("status");
const predictions = document.getElementById("predictions");

async function loadModel() {
    if (model) return;

    status.textContent = "Loading AI model...";
    status.classList.remove("is-error");

    if (!window.tmImage) {
        throw new Error("The model libraries could not be loaded. Check your internet connection and reload the page.");
    }

    const modelUrl = new URL("model.json", MODEL_URL);
    const metadataUrl = new URL("metadata.json", MODEL_URL);
    const modelResponse = await fetch(modelUrl);
    if (!modelResponse.ok) {
        throw new Error(
            `Model files could not be found (model.json returned HTTP ${modelResponse.status}).`
        );
    }

    model = await tmImage.load(modelUrl.href, metadataUrl.href);
}

async function startCamera() {
    startButton.disabled = true;
    status.classList.remove("is-error");

    try {
        await loadModel();

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("This browser does not support webcam access. Try a current browser over HTTPS or localhost.");
        }

        status.textContent = "Requesting webcam access...";
        cameraStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });

        camera.srcObject = cameraStream;
        await camera.play();
        camera.hidden = false;
        cameraRunning = true;
        stopButton.disabled = false;
        status.textContent = "Camera is on. Analyzing video...";
        predictFrame();
    } catch (error) {
        console.error(error);
        stopCamera();
        status.textContent = `Could not start the camera and AI. ${error.message}`;
        status.classList.add("is-error");
    } finally {
        startButton.disabled = cameraRunning;
    }
}

async function predictFrame() {
    if (!cameraRunning) return;

    try {
        const results = await model.predict(camera);
        if (!cameraRunning) return;

        results.sort((a, b) => b.probability - a.probability);
        predictions.replaceChildren();

        results.forEach(result => {
            const item = document.createElement("p");
            item.textContent = `${result.className}: ${(result.probability * 100).toFixed(2)}%`;
            predictions.appendChild(item);
        });

        predictionFrame = requestAnimationFrame(predictFrame);
    } catch (error) {
        if (!cameraRunning) return;

        console.error(error);
        stopCamera();
        status.textContent = `Prediction failed. ${error.message}`;
        status.classList.add("is-error");
    }
}

function stopCamera() {
    cameraRunning = false;
    cancelAnimationFrame(predictionFrame);
    cameraStream?.getTracks().forEach(track => track.stop());
    cameraStream = undefined;
    camera.srcObject = null;
    camera.hidden = true;
    stopButton.disabled = true;
    startButton.disabled = false;
}

startButton.addEventListener("click", startCamera);

stopButton.addEventListener("click", () => {
    stopCamera();
    status.textContent = "Camera stopped.";
});

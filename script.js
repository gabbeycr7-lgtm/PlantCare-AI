const URL = "https://teachablemachine.withgoogle.com/models/mokj-InrT/";

let model;

const solutions = {
"TOMATO HEALTHY":"✅ Plant is healthy. Continue regular watering and care.",

"TOMATO EARLY BLIGHT":"🧪 Remove infected leaves and spray Mancozeb fungicide.",

"TOMATO LATE BLIGHT":"🧪 Spray Copper fungicide and avoid excess moisture.",

"TOMATO LEAF MOLD":"🧪 Improve air circulation, avoid overhead watering, and spray a fungicide such as Chlorothalonil or Copper.",

"POTATO EARLY BLIGHT":"🧪 Apply fungicide and remove infected leaves.",

"POTATO LATE BLIGHT":"🧪 Spray Copper fungicide and avoid excess moisture.",

"PEPPER HEALTHY":"✅ Plant is healthy. Continue proper watering and regular care.",

"PEPPER BACTERIAL SPOT":"🧪 Remove infected leaves and spray a copper-based bactericide."
};

async function loadModel(){
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
}

loadModel();

document.getElementById("imageUpload").addEventListener("change", async function(event){

    const file = event.target.files[0];

    const img = document.getElementById("preview");
    img.src = URL.createObjectURL(file);

    img.onload = async ()=>{

        const prediction = await model.predict(img);

        prediction.sort((a,b)=>b.probability-a.probability);

        const disease = prediction[0].className;
        const confidence = (prediction[0].probability*100).toFixed(1);

        document.getElementById("result").innerHTML=
        `<h2>${disease}</h2>
        <p>Confidence: ${confidence}%</p>
        <p>${solutions[disease] || "No solution available."}</p>`;
    }

});

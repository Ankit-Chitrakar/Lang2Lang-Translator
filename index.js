console.log('Hello this is a Translator project');
// intialize tag , class and ids.
let select = document.querySelectorAll('.form-select');
let inputText = document.getElementById('inputText');
let outputText = document.getElementById('outputText');
let button = document.querySelector('.button');
let audio = new Audio('click.mp3');
let exchangeButton = document.querySelector('.exchange i');
let inputCopy = document.getElementById('inputCopy');
let outputCopy = document.getElementById('outputCopy');
let speakerInput = document.getElementById('speakerInput');
let speakerOutput = document.getElementById('speakerOutput');
let pop = new Audio('pop.mp3');
let micOn = new Audio('micOn.mp3');
let micOff = new Audio('micOff.mp3');
let exchange = new Audio('exchange.mp3');
let solution = new Audio('solution.mp3');
let mic = document.getElementById('mic');




// Languages data object
const Languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

// initially set the input selector language in English and output selector language in Bengali.
select.forEach((tag, id) =>{
    // console.log(tag);
    for (const language in Languages) {
    //   console.log(Languages[language]);
    // console.log(e.target);
    let selected;
        if(id == 0 && language == "en-GB"){
            selected = "selected";
        }
        else if(id == 1 && language == "bn-IN"){
            selected = "selected";
        }
      let option = `<option value = ${language} ${selected}>${Languages[language]}</option>`;
      tag.insertAdjacentHTML('beforeend', option);
    }
});

// when user clicks Translate Text button 
button.addEventListener('click', ()=>{
    if(inputText.value != ''){
        audio.play();
        // console.log(inputText.value);
        let text = inputText.value;
        let inputLang = select[0].value;
        let outputLang = select[1].value;
        // console.log(text, inputLang, outputLang);
        let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLang}|${outputLang}`;
        outputText.placeholder = 'Translating.....';
        fetch(apiURL).then(res => res.json()).then(data =>{
            // console.log(data);
            setTimeout(() => {
                solution.play();
                outputText.value = data.responseData.translatedText;
            }, 2000);
        });
    
    }
    else{
        alert('Please put appropriate Text and then press Tranlate Text button!!');
    }
});


// when user clicks exchange button to swap languages as well as texts
exchangeButton.addEventListener('click', ()=>{
    // console.log('Hello');
    exchange.play();
    let tempText = inputText.value;
    let tempLang = select[0].value;
    inputText.value = outputText.value;
    select[0].value = select[1].value;
    outputText.value = tempText;
    select[1].value = tempLang;
    document.querySelector('.exchange i').classList.add('exchanged');
    setTimeout(() => {
        document.querySelector('.exchange i').classList.remove('exchanged');
       }, 2000);

});

// when user clicks copy button of input Text
inputCopy.addEventListener('click', ()=>{
    if(inputText.value != ''){
        pop.play();
        navigator.clipboard.writeText(inputText.value);
        document.getElementById('inputCopy').classList.add('copied');
        setTimeout(() => {
            document.getElementById('inputCopy').classList.remove('copied');
           }, 2000);
    }
    else{
        alert('Please put appropriate Text and then press Copy Text button!!');
    }
    
})

// when user clicks copy button of output Text
outputCopy.addEventListener('click', ()=>{
    if(outputText.value != ''){
        pop.play();
        navigator.clipboard.writeText(outputText.value);
        document.getElementById('outputCopy').classList.add('copied');
        setTimeout(() => {
            document.getElementById('outputCopy').classList.remove('copied');
           }, 2000);
    }
    else{
        alert('Please put appropriate Text and then press Copy Text button!!');
    }
})

// when user clicks in speaker button of input side
function textToSpeech(text){
    let utterence = new SpeechSynthesisUtterance(text);
    utterence.lang = select[0].value;
    utterence.volume = 5.9;
    speechSynthesis.speak(utterence);
}

speakerInput.addEventListener('click', ()=>{
    // console.log('Hello');
    let Text = inputText.value;
    if(Text != ''){
        textToSpeech(Text);
        document.getElementById('speakerInput').classList.add('soundUp');
        setTimeout(() => {
            document.getElementById('speakerInput').classList.remove('soundUp');
           }, 2000);
    }
    else{
        alert('Please put appropriate Text and then press speaker button for hearing!!');
    }
  
    // console.log(Text);
})

speakerOutput.addEventListener('click', ()=>{
    let outText = outputText.value;
    if(outText != ''){
        textToSpeech(outText);
        document.getElementById('speakerOutput').classList.add('soundUp');
    setTimeout(() => {
        document.getElementById('speakerOutput').classList.remove('soundUp');
       }, 2000);
    }
    else{
        alert('Please put appropriate Text and then press speaker button for hearing!!');
    }
    
    // console.log(outText);
})

inputText.addEventListener('click', ()=>{
    // inputText.value = '';
    outputText.value = '';
    outputText.placeholder = 'Translate';
});

function speechToText(){
    let speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e=>{
        const transcript = Array.from(e.results).map(result =>result[0]).map(result =>result.transcript)

        inputText.innerText = transcript;
    })

    if(speech == true){
        recognition.start();
    }

    // let recognition = new webkitSpeechRecognition();
    // recognition.lang = "en-GB";
    // recognition.onresult = function(event){
    //     document.getElementById('inputText').innerText = event.results[0][0].transcript;
    // }
    // recognition.start();
    // // if(document.getElementById('inputText').innerText != ''){
    // //   
    // // }
}
mic.addEventListener('click', ()=>{
    micOn.play();
    inputText.innerText = '';
    outputText.value = '';
    outputText.placeholder = 'Translate';
    document.getElementById('mic').classList.add('micOn');
    setTimeout(() => {
        document.getElementById('mic').classList.remove('micOn');
       }, 3000);
    speechToText();
});

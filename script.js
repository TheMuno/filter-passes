import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, 
    getDocs, updateDoc, deleteField, collection,
    arrayUnion, arrayRemove, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQPqbtlfHPLpB-JYbyxDZiugu4NqwpSeM",
    authDomain: "askkhonsu-map.firebaseapp.com",
    projectId: "askkhonsu-map",
    storageBucket: "askkhonsu-map.appspot.com",
    messagingSenderId: "266031876218",
    appId: "1:266031876218:web:ec93411f1c13d9731e93c3",
    measurementId: "G-Z7F4NJ4PHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);   

let goCityArr2 = [], 
sightseeingArr2 = [], 
cityPassArr2 = [];

async function retrievePasses() {
    const docRef = doc(db, 'passes', 'nyc');
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        console.log(`Passer ${passer} doesn't exist!`);
        return;
    }

    const data = docSnap.data();
    const { passes } = data;

    console.log(`passes:`, passes)

    goCityArr2 = passes.filter(pass => !!pass.gocity);
    sightseeingArr2 = passes.filter(pass => !!pass.sightseeing);
    cityPassArr2 = passes.filter(pass => !!pass.citypass);

    console.log('goCityArr2', goCityArr2)
    console.log('sightseeingArr2', sightseeingArr2)
    console.log('cityPassArr2', cityPassArr2)
}

retrievePasses(); 

const goCityArr = [
    'the edge', 
    'hop on bus', 
    'circle line', 
    'esb', 
    '911 museum', 
    '1 world', 
    'tor', 
    'libby', 
    'moma', 
    'guggenhiem', 
    'rise ny', 
    'amnh', 
    'radio city music hall tour', 
    'catacombs by candleight', 
    '3 neighborhood tour', 
    'wall st tour', 
    'artechouse', 
    'madam tussands', 
    'yankee stadium tour', 
    'madison sq garden tour'
];

const sightseeingArr = [
    'the edge', 
    'hop on bus', 
    'circle line', 
    'esb', 
    '911 museum', 
    '1 world', 
    'tor', 
    'libby', 
    'rise ny', 
    'amnh', 
    'museum of broadway', 
    'central park zoo', 
    'artechouse', 
    'madam tussands', 
    'yankee stadium tour', 
    'madison sq garden tour'
];

const cityPassArr = [
    'circle line', 
    'esb', 
    '911 museum', 
    'tor', 
    'guggenhiem', 
    'amnh'
];

const $goCity = document.querySelector('[data-pass="go-city"]');
const $goCItyName = $goCity.querySelector('.name');
const $gocityResultPasses = $goCity.querySelector('.result-passes');

const $sightseeing = document.querySelector('[data-pass="sightseeing"]');
const $sightseeingName = $sightseeing.querySelector('.name');
const $sightseeingResultPasses = $sightseeing.querySelector('.result-passes');

const $cityPass = document.querySelector('[data-pass="city-pass"]');
const $cityPassName = $cityPass.querySelector('.name');
const $cityPassResultPasses = $cityPass.querySelector('.result-passes');

const $samplePass = $goCity.querySelector('.result-pass');

const $passes = document.querySelector('.passes');
$passes.addEventListener('click', e => {
    if (!e.target.closest('.pass')) return;
    if (!e.target.classList.contains('pass-check')) return; // make sure it only registers the checkbox click

    const $pass = e.target.closest('.pass');
    handlePassesClick($pass);
});

function handlePassesClick($pass) {
    const $checkbox = $pass.querySelector('input');
    const label = $pass.querySelector('label').textContent.trim().toLowerCase();

    $goCItyName.classList.remove('active');
    $sightseeingName.classList.remove('active');
    $cityPassName.classList.remove('active');

    $goCItyName.classList.remove('inactive');
    $sightseeingName.classList.remove('inactive');
    $cityPassName.classList.remove('inactive');

    $checkbox.checked ? addAllPassesToRelevantSections(label) : removePassFromSection(label);

    activateDeactivateAllPasses(); 
}

function addAllPassesToRelevantSections(label) {
    addPassToSection(goCityArr, label, $gocityResultPasses);
    addPassToSection(sightseeingArr, label, $sightseeingResultPasses);
    addPassToSection(cityPassArr, label, $cityPassResultPasses);
}

function addPassToSection(section, label, parent) {
    const $resultPassClone = $samplePass.cloneNode(true);
    $resultPassClone.querySelector('.text').textContent = label;
    $resultPassClone.classList.remove('hide');

    section.includes(label)? $resultPassClone.querySelector('.tick').classList.remove('hide') : $resultPassClone.querySelector('.ex').classList.remove('hide');

    parent.append($resultPassClone);
}

function removePassFromSection(label) {
    const $goCityPass = [...$gocityResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
    const $sightseeingPass = [...$sightseeingResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
    const $cityPass = [...$cityPassResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
    
    if ($goCityPass.length) $goCityPass[0].remove();
    if ($sightseeingPass.length) $sightseeingPass[0].remove();
    if ($cityPass.length) $cityPass[0].remove();
}

function activateDeactivatePassTitles(passes, title) {
    const $allTicks = passes.querySelectorAll('.result-pass:not(.hide) .tick');
    const hiddenGoCityTicks = [...$allTicks].filter(t => t.classList.contains('hide'));
    if (hiddenGoCityTicks.length) {
        title.classList.add('inactive');
    }
    else {
        $allTicks.length ? title.classList.add('active') : title.classList.add('inactive');
    } 
} 

function activateDeactivateAllPasses() {
    activateDeactivatePassTitles($gocityResultPasses, $goCItyName);
    activateDeactivatePassTitles($sightseeingResultPasses, $sightseeingName);
    activateDeactivatePassTitles($cityPassResultPasses, $cityPassName);
}
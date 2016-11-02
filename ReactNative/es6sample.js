for(var obj of array){
// for-of 
}

// 不定参数，参数默认值表达式在函数调用时自左向右求值，没有默认值的参数隐式默认为undefined
function animalSentence(animals2="tigers",
    animals3=(animals2 == "bears") ? "sealions" : "bears")
{
  return `Lions and ${animals2} and ${animals3}! Oh my!`;
}

animalSentence();                       // Lions and tigers and bears! Oh my!
animalSentence("elephants");            // Lions and elephants and bears! Oh my!
animalSentence("elephants", "whales");  // Lions and elephants and whales! Oh my!
animalSentence("bears");  // Lions and bears and sealions! Oh my!

// =>
// ES5
var selected = allJobs.filter(function (job) {
  return job.isSelected();
});

$("#confetti-btn").click(function (event) {
  playTrumpet();
  fireConfettiCannon();
});

// ES6
var selected = allJobs.filter(job => job.isSelected());
$("#confetti-btn").click(event => {
  playTrumpet();
  fireConfettiCannon();
});


// 为与你玩耍的每一个小狗创建一个新的空对象
var chewToys = puppies.map(puppy => {});   // 这样写会报Bug！
var chewToys = puppies.map(puppy => ({})); 
// 一个空对象{}和一个空的块{}看起来完全一样,所以用小括号包裹对象字面量


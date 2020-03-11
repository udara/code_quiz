// var high_scores = [];
// new_entry  = {
//     'initials': 'UR',
//     'scroe':20
// }
// high_scores.push(new_entry);
// localStorage.setItem('high_scores', JSON.stringify(high_scores));
// var retrievedObject = localStorage.getItem('high_scores');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));



function save_score_to_local_storage(initials,score)
{
    if (localStorage.getItem('high_scores')){
       var  high_score_array =  JSON.parse(localStorage.getItem('high_scores'));
    }
    else{
        var  high_score_array = [];
    }
    var score  = {
        'initials': initials,
        'score': score
    }
    high_score_array.push(score);
    high_score_array.sort(function(a, b){return b.score - a.score});
    let top_five_scores = high_score_array.slice(0,5);
    localStorage.setItem('high_scores', JSON.stringify(top_five_scores));
}

function clearStorage()
{
    localStorage.clear();
}

function display_high_scores_stored_in_local_storage()
{
    let high_score_array = JSON.parse(localStorage.getItem('high_scores'));
    high_score_array.sort(function(a, b){return b.score - a.score});
    console.log(high_score_array);
}

//display_high_scores_stored_in_local_storage();
//clearStorage()
// save_score_to_local_storage('UU',55);
// save_score_to_local_storage('PP',25);
// save_score_to_local_storage('UI',45);
// save_score_to_local_storage('TI',40);
// save_score_to_local_storage('YU',20);
// save_score_to_local_storage('YU',25);
// save_score_to_local_storage('TT',75);
// save_score_to_local_storage('KK',10);

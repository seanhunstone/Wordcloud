// for counting words in a string

var words="Hi there and hello there. Welcome and hello there.";

var wordcnt = words.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
    map[word] = (map[word]||0)+1;
    return map;
}, Object.create(null));

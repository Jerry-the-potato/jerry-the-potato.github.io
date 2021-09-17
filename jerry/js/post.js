
/* 以下內容須放進 <div id='content-inner'></div> */
(function(){

//     預期樣式
//     <div class='post'>
//         <a href='#'>
//             <div class='date'><span>6</span>SEP</div>
//             <h2>好久好久了，都沒問過......今天你過的好嗎?</h2>
//             <p><img src='images/thankyou.png' alt='感謝小貼紙'>今天是個美好的一天，雖然開始的平淡無奇，卻每一刻都充滿驚喜！生活嘛，不就是時而無聊、時而快樂，你說不知道我在說什麼，扯東扯西，但是，我只是個內建的文章呀!......</p>
//             <p class='more'>Read More</p>
//         </a>
//     </div>

    let JsonToHtml = (jsonData) => {
        //for(let post in jsonData.posts){
        let tag = (tagName) => document.createElement(tagName);
        jsonData.posts.forEach(post => {
            let div = tag('div');
            div.setAttribute('class','post');  // 也可以用div.classList.add('post');
            {
                let a = tag('a');
                a.setAttribute('href', post.link);
                {
                    let div = tag('div');
                    div.setAttribute('class','date');
                    div.innerHTML = '<span>' + post.date.day + '</span>' + post.date.month;
                    a.appendChild(div); 
                }
                {
                    let h2 = tag('h2');
                    h2.innerText = post.header;
                    a.appendChild(h2);
                }
                {
                    let p = tag('p');
                    p.innerHTML = '<img src=' + post.img.src + ' alt=' + post.img.alt + '>' + post.paragrath;
                    a.appendChild(p);
                }
                {
                    let p = tag('p');
                    p.setAttribute('class','more');
                    p.innerText = 'Read More'; 
                    a.appendChild(p);
                }
                div.appendChild(a);
            }
            let contentInner = document.querySelector('#content-inner');
            contentInner.appendChild(div);
        });
    }


    console.log("test");
    let URLonline = 'https://singandenjoy.000webhostapp.com/webdesign/test.json';
    let URLlocal = 'http://127.0.0.1:5500/WebsiteDesignClass/0903 個人網站切版/test.json';

    postAJAX(0, URLonline);
    function postAJAX(id, url){
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send();
        request.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status === 200){
                    let jsonData = JSON.parse(this.responseText);
                    console.log(jsonData);
                    JsonToHtml(jsonData);
                    console.log("succeed to load test.json from URL: " + url);
                }
                else{
                    console.log("fail to load test.json from URL: " + url);
                    if(id == 0){
                        postAJAX(1, URLlocal);
                    }
                }
            }
        };
    };
})();
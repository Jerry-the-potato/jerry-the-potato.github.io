// 文章伸縮
{
    let posts = document.querySelectorAll(".post");
    posts.forEach((post) => {
        const more = post.querySelector(".more");
        const a = post.getElementsByTagName("a")[0];
        const article = post.getElementsByTagName("article")[0];
        const p = article.getElementsByTagName("p")[0];
        const p_CSS = window.getComputedStyle(p);
        let SetHeight = () => {
            const P_height = p_CSS.height.substring(0, p_CSS.height.lastIndexOf("p"));
            const p_lineHeight = p_CSS.lineHeight.substring(0, p_CSS.lineHeight.lastIndexOf("p"));
            console.log(P_height);
            if(P_height > p_lineHeight * 5){
                if(more.textContent == "Read More"){
                        article.style.maxHeight = p_CSS.height;
                        more.textContent = "Show Less";
                }
                else{
                    article.style.maxHeight = p_lineHeight * 5 + "px";
                    more.textContent = "Read More";
                }
            }
            else{
                more.textContent = "That's All";
            }
        }
        more.addEventListener("click", function(event){
            event.stopPropagation();
            SetHeight();
        }, false);
        /* 提供手機用戶更大的範圍來打開文章 */
        a.addEventListener("click", function(event){
            SetHeight();
        }, false);
    })
}
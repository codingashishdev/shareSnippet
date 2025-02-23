const form = document.querySelector("#snippet-form");
const snippet_list = document.querySelector('#snippet-list')
const snippet_page = document.querySelector('#snippet-page')

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button_type = e.submitter.id;
    if (button_type === "save-snippet") {
        const name = document.querySelector("#name").value;
        const snippet = document.querySelector("#paste-snippet").value;
        const description = document.querySelector("#description").value;

        const response = await fetch("http://localhost:3000/save-snippet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, snippet, description }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }
});

snippet_page.addEventListener('click', async (e) =>{
    const snippets = await fetch('http://localhost:3000/snippet-list')
    console.log(snippets)
    // snippet_list.innerHTML = `<div>${snippets}</div>`      
})

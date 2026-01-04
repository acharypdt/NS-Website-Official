
class NsmCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const title = document.createElement('h3');
        title.textContent = this.getAttribute('title');

        const image = document.createElement('img');
        image.src = this.getAttribute('image');
        image.alt = this.getAttribute('title');

        const style = document.createElement('style');
        style.textContent = `
            .card {
                background-color: #1f1f1f;
                border-radius: 10px;
                padding: 1.5rem;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 153, 51, 0.2);
                text-align: center;
                transition: transform 0.3s ease;
            }
            .card:hover {
                transform: translateY(-10px);
            }
            .card img {
                max-width: 100%;
                border-radius: 5px;
            }
            h3{
                font-family: 'Khand', sans-serif;
                color: #FF9933;
                font-size: 1.5rem
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(card);
        card.appendChild(image);
        card.appendChild(title);
    }
}

customElements.define('nsm-card', NsmCard);

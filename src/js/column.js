export default class Column{
    constructor(cl){
        this.column = cl;
        this.footer = cl.querySelector('.footer');
        this.add = cl.querySelector('.add_card');
        this.textArea = cl.querySelector('.card_text');
        this.column.ondragover = this.drop;
    };


    showAddBlock(){
        this.footer.classList.add('fog')
        this.add.classList.remove('fog')
        this.add.addEventListener('click',(e) => {
            if(e.target.className == 'add_cross'){
                this.closeBlock()
            } else {
                this.addCard();;
            }
        })
    };

    addCard(){
        let cardValue = this.textArea.value;
        if ( cardValue != ''){
            this.createCard(this.getId(),cardValue);
            this.saveCard(cardValue);
            this.closeBlock();
            this.textArea.value ='';
        }
    };

    createCard(id, cardValue){
        const card = document.createElement('div');
        const cross = document.createElement('div');
        cross.innerHTML = '&#10006;'
        card.id = id;
        card.draggable = 'true'
        card.classList.add('card');
        cross.classList.add('cross');
        cross.classList.add('fog');
        card.innerText = cardValue;
        card.append(cross);
        this.column.append(card);
    };

    getId(){
        let idNums = JSON.parse(localStorage.getItem(this.column.classList[1]))
        if (idNums == null){
            return `1${this.column.classList[1]}`
        } else{
            return String(Number(String(Object.keys(idNums).slice(-1)).replace(/[^0-9]/g, ''))+1)+String(this.column.classList[1])
        }
    };


    saveCard(cardValue){
        const jsn = JSON.parse(localStorage.getItem(this.column.classList[1]))
        const id = this.getId();
        const newValue = {};
        newValue[id]=cardValue;
        if(jsn == null){
            localStorage.setItem(this.column.classList[1], JSON.stringify(newValue));
        } else{
            let local = JSON.parse(localStorage.getItem(this.column.classList[1]));
            local[id]=cardValue
            localStorage.setItem(this.column.classList[1], JSON.stringify(local));
        }
    };


    delCard(element){
        const id = element.id;
        const local =JSON.parse(localStorage.getItem(this.column.classList[1]));
        delete local[id];
        localStorage.setItem(this.column.classList[1], JSON.stringify(local));
        element.remove();
    };


    closeBlock(){
        this.textArea.value ='';
        this.footer.classList.remove('fog');
        this.add.classList.add('fog');
    };

    saveState(){
        localStorage.removeItem(this.column.classList[1]) 
        for(let card of this.column.children){
            if (card.className == 'card'){
                this.saveCard(card.innerText.replace(/[^a-zа-яё0-9\s]/gi,''))
            };
        };
    }


};
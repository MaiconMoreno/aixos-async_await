import api from './api.js';

class App {

    constructor() {
        this.repositorio = [];

        //elementos html
        this.elementeForm = document.getElementById('form-repositorio');
        this.elementoList = document.getElementById('lista-repositorio');
        this.elementoInput = document.querySelector('input');

        this.registraEvento();
    }

    registraEvento() {
        this.elementeForm.onsubmit = evento => this.adicionarRepositorio(evento);
    }

    setLoading(loading = true) {
        if (loading === true) {
            let elementoLoading = document.createElement('span');
            elementoLoading.appendChild(document.createTextNode('Carregando'));
            elementoLoading.setAttribute('id', 'loading');

            this.elementeForm.appendChild(elementoLoading);
        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async adicionarRepositorio(evento) {
        evento.preventDefault();

        const repositorioInput = this.elementoInput.value;

        if (repositorioInput.length === 0) {
            alert('Campo vazio, digite um repositorio.');
            return;
        }
        else {

            console.log(repositorioInput.length);
            this.setLoading(true);

            try {
                const response = await api.get(`/repos/${repositorioInput}`);

                const { name, description, html_url, owner: { avatar_url } } = response.data;

                this.repositorio.push({
                    avatar_url,
                    name,
                    description,
                    html_url
                });

                this.renderizar();

                this.elementoInput.value = '';

            } catch (error) {

                alert(`Não encontramos nada com: ${repositorioInput}`)
                console.warn(error);
            }

            this.setLoading(false);
        }
    }


    renderizar() {

        this.elementoList.innerHTML = '';

        this.repositorio.forEach(repositorio => {

            // imagem 
            let elementoImg = document.createElement('img');
            elementoImg.setAttribute('src', repositorio.avatar_url);

            //Titulo 
            let elementoTitle = document.createElement('strong');
            elementoTitle.appendChild(document.createTextNode(repositorio.name));

            //Descrição
            let elementoDescription = document.createElement('p');
            elementoDescription.appendChild(document.createTextNode(repositorio.description));

            //html_url
            let elementoUrl = document.createElement('a');
            elementoUrl.setAttribute('target', '_black');
            elementoUrl.setAttribute('href', repositorio.html_url);
            elementoUrl.appendChild(document.createTextNode('Acessar'));

            // //Adicionando todos componentes na ListaItem
            let elementoListaItem = document.createElement('li');
            elementoListaItem.appendChild(elementoImg);
            elementoListaItem.appendChild(elementoTitle);
            elementoListaItem.appendChild(elementoDescription);
            elementoListaItem.appendChild(elementoUrl);

            this.elementoList.appendChild(elementoListaItem);

        });


    }
}


new App();
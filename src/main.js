import axios from 'axios';



class Api {

    static async getUserFromGitHub(userAcount) {

        try {

            const response = await axios.get(`https://api.github.com/users/${userAcount}`);
            console.log(response.data)

        } catch (error) {

            console.log('Usuário não localizado!')
        }
    }

    static async getRepositoriesFromGitHub(repo) {

        try {

            const response = await axios.get(`https://api.github.com/repos/${repo}`);
            console.log(response.data);

        } catch (error) {
            console.log('Repositorio não existe')
        }
    }
};

// busca dados 
// Api.getUserFromGitHub('maiconmoreno');
Api.getRepositoriesFromGitHub('Rocketseat/bootcamp-gostack-desafio-01');





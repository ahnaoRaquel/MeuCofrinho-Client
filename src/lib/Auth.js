
export const authenticate = async (username, password) => {
    try {
        console.log("Attempting to authenticate with username:", username);
        const response = await fetch(`http://127.0.0.1:8080/usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username": username, "password": password }),
        });

        if (response.ok) {
            console.log("Login response OK");
            const data = await response.json();
            return data;
        } else {
            console.log("Login response not OK: Usuário inválido");
            throw new Error("Usuário inválido");
        }
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        throw new Error('Erro ao autenticar:' + error.message);
    }
};


export const create = async (nome, senha) => {
    try {
        const response = await fetch('http://localhost:8080/usuario/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "nome": nome, "senha": senha }),
        });

        if (response.ok) {
            const usuario = await response.text();
            return usuario;
        } else {
            throw new Error("Usuário inválido");
        }
    } catch (error) {
        throw new Error('Erro ao autenticar:' + error);
    }
}


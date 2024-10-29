Este projeto foi desenvolvido em um ambiente Windows, portanto, o guia de instalação será baseado nesse sistema operacional. Siga as etapas abaixo para instalar o MongoDB:

## Download do MongoDB:
- Acesse o site oficial do MongoDB: https://www.mongodb.com/try/download/community.
- Selecione a versão marcada como Current.
- Escolha a opção Windows 64-bit.
- Selecione o Package: MSI para obter o instalador.
- Execução do Instalador:
- Após o download, execute o instalador do MongoDB.
- Aceite os termos de serviço.
- Escolha a opção de Instalação Completa para garantir que todos os componentes necessários sejam instalados.
- Observação: Se você não desejar utilizar o MongoDB Compass (ferramenta visual para gerenciamento do banco de dados), não é necessário marcar a opção "Install MongoDB Compass".
- Continue seguindo as instruções do instalador até concluir a instalação.

## Clonagem do Repositório no GitHub
- Caso ainda não tenha o Git instalado em seu sistema, faça o [download](https://git-scm.com/downloads).
- Siga as instruções do instalador para concluir a instalação.

## Obtenção da URL do Repositório
- Acesse a página do repositório no GitHub que você deseja clonar.
- Clique no botão verde "Code" e copie a URL fornecida (HTTPS ou SSH).
- Link para clonagem: https://github.com/GuiOFICINA/OFICINASUFICIENCIA.git.

## Clonagem do Repositório
- Abra um terminal do computador ou do próprio VsCode.
- Navegue até o diretório onde você deseja clonar o repositório. Você pode usar o comando cd para mudar de diretório. 

## Copiar código
- cd C:\caminho\para\o\diretório...
- Use o comando:
```sh
git clone https://github.com/GuiOFICINA/OFICINASUFICIENCIA.git.
```
- Pressione Enter para executar o comando. Isso criará uma cópia local do repositório em seu diretório.

## Pré-Requisito
- Node >=6.9.0

## Uso & Execução
- Com o projeto aberto no VSCode execute os seguintes comandos:
```sh
npm install

cd CLIENTE

npm install

cd ../

cd SERVIDOR

node servidor.js
```

### Em outro terminal continue com os seguintes comandos: 

```sh
cd CLIENTE\Aplicacao

npm start
```

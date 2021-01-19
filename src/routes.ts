// IMPORT DAS APIs
import { Router } from 'express';

// IMPORT DOS CONTROLLERS
import UsuarioController from './Controller/UsuarioController';
import BrokerController from './Controller/BrokerController';
import TopicoController from './Controller/TopicoController';
import DispositivoController from './Controller/DispositivoController';

// IMPORT DOS SERVICES
import LogarService from './Service/LoginService';
import BrokerService from './Service/BrokerService';


const routes = Router();

// ROUTES USUARIO
routes.post('/usuario/cadastrar', UsuarioController.Cadastrar);
routes.get('/usuario/listar', UsuarioController.ListarTodos);
routes.get('/usuario/buscar/:id', UsuarioController.BuscarPorId); // O ID utilizado nesta Rota para BUSCAR é o ID do USUÁRIO
routes.put('/usuario/atualizar/:id', UsuarioController.Atualizar); // O ID utilizado nesta Rota para ATUALIZAR é o ID do USUÁRIO
routes.delete('/usuario/deletar/:id', UsuarioController.Deletar); // O ID utilizado nesta Rota para DELETAR é o ID do USUÁRIO


// ROUTES BROKER
routes.post('/broker/cadastrar/:id', BrokerController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do BROKER é o ID do USUÁRIO
routes.get('/broker/listar/:id', BrokerController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do BROKER é o ID do USUÁRIO
routes.get('/broker/buscar/:id', BrokerController.BuscarPorId); // O ID utilizado nesta rota para realizar a BUSCA é o ID do BROKER
routes.put('/broker/atualizar/:id', BrokerController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do BROKER
routes.delete('/broker/deletar/:id', BrokerController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do BROKER


// ROUTES TOPICO
routes.post('/topico/cadastrar/:id', TopicoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do TÓPICO é o ID do USUÁRIO
routes.get('/topico/listar/:id', TopicoController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do TÓPICO é o ID do USUÁRIO
routes.get('/topico/buscar/:id', TopicoController.BuscarPorId); // O ID utilizado nesta rota para realizar a BUSCA é o ID do TÓPICO
routes.put('/topico/atualizar/:id', TopicoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do TÓPICO
routes.delete('/topico/deletar/:id', TopicoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do TÓPICO


// ROUTES DISPOSITIVO
routes.post('/dispositivo/cadastrar/:id', DispositivoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do DISPOSITIVO é o ID do USUÁRIO
routes.get('/dispositivo/listar/:id', DispositivoController.Listar); // O ID utilizado nesta rota para realizar o LISTARTODOS do DISPOSITIVO é o ID do USUÁRIO
routes.get('/dispositivo/buscar/:id', DispositivoController.Buscar); // O ID utilizado nesta rota para realizar a BUSCA é o ID do DISPOSITIVO
routes.put('/dispositivo/atualizar/:id', DispositivoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do DISPOSITIVO
routes.delete('/dispositivo/deletar/:id', DispositivoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do DISPOSITIVO


// ROUTES DOS SERVICES COMO LOGIN E RECUPERAÇÃO DE SENHA
routes.post('/logar', LogarService.Logar);
routes.post('/recuperarSenha', LogarService.RecuperarSenha);
routes.post('/conectarBroker/:id', BrokerService.Conectar); // O ID utilizado nesta rota para realizar a CONEXÃO do BROKER é o ID do USUÁRIO
routes.post('/subscriber/:id', BrokerService.Subscriber); // O ID utilizado nesta rota para realizar o SUBSCRIBER no TOPICO é O ID do DISPOSITIVO
routes.post('/publisher/:id', BrokerService.Publisher); // O ID utilizado nesta rota para PUBLICAR é o ID do TÓPICO



export default routes;
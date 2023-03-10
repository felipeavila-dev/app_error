export const pessoa = {
  name: 'pessoa',
  primaryKey: 'cod_pessoa',
  properties: {
        cod_pessoa: 'int',
        razao: 'string',
        fantasia: 'string?',
        cnpj_cpf: 'string?',
        tipo_pessoa: 'string',
        ativo: 'string',
        ie_rg: 'string?',
        cliente: 'string',
        anotacoes: 'string?',
        dt_nascto: 'string?',
        representante: 'string',
        cod_logradouro: 'int?',
        cod_repres: 'int?',
        endereco: 'string?',
        numero: 'string?',
        bairro: 'string?',
        cod_cidade: 'int?',
        nome_cidade: 'string?',
        cod_estado: 'string?',
        cep: 'string?',
        complemento: 'string?'
    }
}

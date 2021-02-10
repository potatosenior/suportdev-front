/* "use strict";

const createCall = require("../../application/use_cases/call/createCall");
 const deleteCall = require("../../application/use_cases/call/deleteCall");
const indexCalls = require("../../application/use_cases/call/indexCall");
const getCall = require("../../application/use_cases/call/getCall");
const updateCall = require("../../application/use_cases/call/updateCall"); 

 module.exports = {
  async create(callData) {
    const { name, description, status } = callData;

    try {
      const client = await createCall(name, description, status).catch(
        error => {
          throw error;
        }
      );

      return res.status(201).send({
        error: false,
        message: "Chamado criado com sucesso!",
        data: client,
      });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
        path: error.path || null,
      });
    }
  }, 

   async delete(req, res) {
    const { id } = req.params;

    try {
      const call = await deleteCall(id, serviceLocator).catch(error => {
        throw error;
      });

      if (call)
        return res.status(201).send({
          error: false,
          message: "Chamado deletado com sucesso!",
          data: call,
        });
      else
        return res.status(400).send({
          error: true,
          message: "Chamado não existe",
        });
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  }, 
   
  async index(req, res) {
    try {
      const calls = await indexCalls(serviceLocator).catch(error => {
        throw error;
      });

      return res.status(201).send(calls);
    } catch (error) {
      // console.error(error);
      return res.status(error.code || 500).send({
        error: true,
        message: error.message,
      });
    }
  },

  async findById(req, res) {
    const { id } = req.params;

    try {
      const call = await getCall(id, serviceLocator).catch(error => {
        throw error;
      });
    } catch (error) {
      // console.error(error);

    }
  },

  async update(req, res) {
    const { id, name, cpf, description, status } = req.body;

    try {
      const call = await updateCall(
        id,
        cpf,
        name,
        description,
        status,
        serviceLocator
      ).catch(error => {
        throw error;
      });
    } catch (error) {
      console.error(error);
    }
  },
};
  */

import sql from 'mssql';

const config = {
  user: 'trade',
  password: 'tradem',
  server: '10.10.11.109', // IP do SQL Server
  database: 'Fermacom_Diego',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export async function atualizarTelefoneCliente() {
  try {
    const pool = await sql.connect(config);

    await pool.request().query(`
      UPDATE COMUNICACAO_R
      SET VALOR = '(33)9872-0036'
      WHERE RITEM = '7810233'
    `);

    await pool.close();
  } catch (error) {
    console.error('Erro ao executar UPDATE no banco:', error);
    throw error;
  }
}

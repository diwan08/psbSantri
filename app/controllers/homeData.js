const db = require("../../database");

class HomeController {
    static async getHome(req, res, next) {
        try {
            // Ambil total santri
            const totalSantri = await db('santri').count('* as total_santri');
            const totalpendaftar = await db('daftar').count('* as total_pendaftar');
            const totalBelum = await db('daftar').where('status', 'belum').count('* as total_belum')
            const totalLunas = await db('daftar').where('status', 'lunas').count('* as total_lunas')
            const totalPending = await db('daftar').where('status', 'Pending').count('* as total_pending')
            const totalTolak = await db('daftar').where('status', 'ditolak').count('* as total_ditolak')


            // Strukturkan response
            const response = {
                total_santri: totalSantri[0].total_santri,
                total_belum: totalBelum[0].total_belum,
                total_lunas: totalLunas[0].total_lunas,
                total_pending: totalPending[0].total_pending,
                total_tolak: totalTolak[0].total_ditolak,
                total_pendaftar: totalpendaftar[0].total_pendaftar,

                
            };

            // Kirimkan response sebagai JSON
            res.json(response);
        } catch (error) {
            // Tangani error
            next(error);
        }
    }
    
}


module.exports = HomeController;

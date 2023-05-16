const contactRepository = require("./../repositories/contact.repository");

const store = async (req, res, next) => {
    try {
        await contactRepository.store(req.body);
        res.json({ message: "Contact stored" });
    } catch(error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const {name, phone, address, notes} = req.query;
        const {totalPages, data} = await contactRepository.get(page, {name, phone, address, notes});
        res.json({totalPages, data});
    } catch (error) {
        next(error)
    }
};

const deleteById = async (req, res, next) => {
    try {
        await contactRepository.deleteById(req.params.id);
        res.json({ message: "Contact deleted" });
    } catch(error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = req.body;
        const contactId = req.params.id;
        await contactRepository.update(contactId, data);
        res.json({ message: "Contact updated" })
    } catch(error) {
        next(error)
    }
};

module.exports = {
    get,
    store,
    update,
    deleteById
}
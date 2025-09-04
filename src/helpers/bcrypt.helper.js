import bcrypt from 'bcrypt'

//FUNCIÓN PARA HASHEAR LA CONTRASEÑA DEL USUARIO
export const hashedPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
}

//FUNCIÓN PARA COMPRAR LA CONTRASEÑA DEL USUARIO A LA HORA DEL LOGIN
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}
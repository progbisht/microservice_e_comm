
import expressApp from "./expressApp"
import { logger } from "./utils"

export const StartServer = async() => {

    const PORT = process.env.PORT || 9000

    expressApp.listen(PORT, ()=> {
        logger.info(`App is listening at Port ${PORT}`)
        
    })

    process.on("uncaughtException", async(err)=> {
        logger.error(err)
        process.exit(1)
        
    })

}

StartServer().then(() => {
    logger.info("Server is up.");
    
})
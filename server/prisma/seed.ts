import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Everson Silva',
            email: 'everson.silva2706@gmail.com',
            avatarURL: 'https://github.com/EverSilva.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Bolão do Everson',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-10-02T12:00:00.201Z',
            firstTeamCountryCode: 'AG',
            secondTeamCountryCode: 'BR', 
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-10-03T12:00:00.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR', 

            guesses: {
                create: {
                    firstTeamPoints: '7',
                    secondTeamPoints: '1',
                    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })


}

main()
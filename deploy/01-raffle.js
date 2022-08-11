const { network, ethers, getChainId } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("30")
const {verrify} = require ("../helper-hardhat-config")
module.exports = async function ({getNamedAccounts, deployment}) {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const ChainId = network.config.chainId
    let VRFCoordinatorAddress, subscriptionId

    if (developmentChains.includes(network.name)) {
        const VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait(1)
        if subscriptionId = transactionReceipt.events[0].args.subId
        const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("30")

        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId,VRF_SUB_FUND_AMOUNT )
    } else {
        vrfCoordinatorV2Address = networkConfig[getChainId]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    const entranceFee = networkConfig[chainId]{"entranceFee"}
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId] ["callbackGaLimit"]
    const interval = networkConfig[chainId]["interval"]


    const args = [vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval]
    const raffle = await deploy ("Raffle", {
        from: deployer,
        args:[],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name)&& process.env.ETHERSCAN_API_KEY){
    log("verifying....")
    await verify(raffle.address, args)
    }

    log("------------")
}
module.exports.tags =  ["all", "raffle"]
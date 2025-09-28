import { Accountbar } from "../component/account/Account"
import { SummaryCard } from "../component/summaryCard/summarycard";
import { GiDjedPillar } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaWallet, FaPiggyBank } from "react-icons/fa";
import { FcDebt } from "react-icons/fc";
import { FaCoins } from "react-icons/fa";
import "./admin.css"
import { Button } from "../component/button/Button";
import AnimatedCard from "../component/Admincord/animatedcard";
import { motion } from "framer-motion";
import FormComp from "../component/Form-comp/Form";
import { RiCloseFill } from "react-icons/ri";
import { ListComp } from "../component/List-comp/Listcomp";
import { StockRegForm } from "../component/Form-comp/Form";
import { useEffect, useState } from "react";
import { OtherAc } from "../component/account/otherAc";
import { GetuserList } from "./adminservice";
import { AdminReg } from "../component/admin-reg/admin-reg";

interface AccountUserRespose {
    id?: number,
    CreatedAt?: string,
    UpdateAt?: string,
    fullname?: string,
    email?: string,
    phone_number?: string,
    nida?: string,
    role?: string,
    isActive?: boolean
}
export const AdminPanel = () => {
    const [productShown, setproductShown] = useState<boolean>(false)
    const [Productlist, setProductlist] = useState<boolean>(false)
    const [showStockreg, setShowStockreg] = useState<boolean>(false)
    const [register, setregister] = useState<boolean>(false)
    const [Accountdetails, setAccountdetails] = useState<AccountUserRespose[]>([])
    const handleRegUser = () => {
        setregister(!register)
    }
    const handleopenproductregForm = () => {
        setproductShown(!productShown)
    }
    const handleOpenList = () => {
        setProductlist(!Productlist)
    }
    const handleopenStockreg = () => {
        setShowStockreg(!showStockreg)
    }
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                duration: 0.8,
                ease: "easeOut"
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    useEffect(() => {
        try {
            const handlegetuserAccount = async () => {
                const response = await GetuserList()
                if (Array.isArray(response.data.data)) {
                    setAccountdetails(response.data.data);
                } else {
                    console.error("API response data is not an array:", response.data);
                    setAccountdetails([]);
                }
                if (!response.data.success) {
                    alert(response.data.message)
                }

            }
            handlegetuserAccount()
        } catch (err) {
            console.error(err)
            alert(err)
        }

    }, [])
    return (
        <motion.div
            className="adminpanel-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="panel-title-account-container" variants={itemVariants}>
                <h2>Admin-Panel</h2>
                <Accountbar />
            </motion.div>
            <motion.div className="busniess-details-container" variants={itemVariants}>
                <SummaryCard SummaryActInfo="250000" SummaryTitle="Business Money" icon={GiTakeMyMoney} style={{ animationDelay: '0.7s' }} />
                <SummaryCard SummaryActInfo="250000" SummaryTitle="Business Capital " icon={GiDjedPillar} style={{ animationDelay: '0.8s' }} />
                <SummaryCard SummaryActInfo="20000" SummaryTitle="Busines Profit" icon={GiProfit} style={{ animationDelay: '0.9s' }} />
            </motion.div>
            <motion.div className="admin-action-container" variants={itemVariants}>
                <Button buttonName="Register Product" Onclick={handleopenproductregForm} />
                <Button buttonName="Update-stock" Onclick={handleOpenList} />
                <Button buttonName="Stock-register" Onclick={handleopenStockreg} />
            </motion.div>
            <motion.div className="business-other-info" variants={itemVariants}>
                <motion.div className="admin-product-details-container" variants={itemVariants}>
                    <Button buttonName="Money Usage" />
                    <AnimatedCard details="Bank-dept" icon={FaPiggyBank} money={2300000} />
                    <AnimatedCard details="Debt" icon={FcDebt} money={23000} />
                    <AnimatedCard details="Business-Networth" icon={FaCoins} money={12000000} />
                </motion.div>
                <motion.div className="admin-report-analysis-container" variants={itemVariants}>
                    <div className="report-card black">
                        <h3>Most Selling Day</h3>
                        <p className="detail-item">Date: 2024-07-20</p>
                        <p className="detail-item">Sales: 1,000,000 Tsh</p>
                    </div>
                    <div className="report-card white">
                        <h3>Least Selling Day</h3>
                        <p className="detail-item">Date: 2024-07-15</p>
                        <p className="detail-item">Sales: 100,000 Tsh</p>
                    </div>
                    <div className="report-card green">
                        <h3>Biggest Debt</h3>
                        <p className="detail-item">Customer: John Doe</p>
                        <p className="detail-item">Amount: 500,000 Tsh</p>
                    </div>
                    <div className="report-card black">
                        <h3>Business Situation</h3>
                        <p className="detail-item">Overall: Stable</p>
                        <p className="detail-item">Trend: Upward</p>
                    </div>
                </motion.div>
                <motion.div className="admin-sales-summary-stock" variants={itemVariants}>
                    <Button buttonName="User-Register" Onclick={handleRegUser} />
                    <div className="critical-stock-product">
                        {Accountdetails.map((u) => (
                            u.id ? < OtherAc key={u.id} fullname={u.fullname} email={u.email} isActive={u.isActive} role={u.role} /> : null
                        ))

                        }
                    </div>
                    <AnimatedCard details="Total salesToday" icon={FaWallet} money={25000} />
                </motion.div>
            </motion.div>
            {productShown &&
                <div className="product-reg-popup">
                    <FormComp isOpen={productShown} onClose={handleopenproductregForm} />
                </div>
            }
            {
                Productlist &&
                <div className="pop-background">
                    <div className="close-poup-container">
                        <div className="icon-close" onClick={() => setProductlist(!Productlist)}>
                            <RiCloseFill size={30} />
                        </div>
                    </div>
                    <div className="content-container-component">
                        <ListComp />
                    </div>
                </div>
            }
            {showStockreg &&
                <div className="product-reg-popup">
                    <StockRegForm isOpen={productShown} onClose={handleopenStockreg} />
                </div>
            }
            {register &&
                <div className="pop-background">
                    <div className="close-poup-container">
                        <div className="icon-close" onClick={() => setregister(!register)}>
                            <RiCloseFill size={30} />
                        </div>
                    </div>
                    <AdminReg />
                </div>
            }

        </motion.div>
    )
}
# 🚀 Bockmetrics - Real-Time Ethereum Blockchain Analytics

Bockmetrics is a **real-time Ethereum blockchain analytics tool** that visualizes key on-chain metrics using **Alchemy Ethereum RPC**. The dashboard processes live blockchain data to provide insights into **USDT transfers, base fees, and gas usage per block**.

---

## 🛠 **Technologies Used**
| **Technology**   | **Purpose** |
|----------------|------------|
| **Alchemy Ethereum RPC** | Fetches live blockchain data |
| **ethers.js**  | Parses Ethereum block data and transaction logs |
| **Next.js & React**  | Frontend for real-time chart visualization |

---

## 🌍 **Live Demo & Addresses**
- **Frontend:** [Blockmetrics](https://stalwart-semolina-67b322.netlify.app/)
- **USDT Contract:** [0xdAC17F958D2ee523a2206206994597C13D831ec7](https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7) (Ethereum Mainnet)
- **Tracked Event:** `Transfer(address,address,uint256)`
- **Event Topic Address:** `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`

**Note:** Used `keccak256(toUtf8Bytes("Transfer(address,address,uint256)"))` to obtain **event topic address**.

---

## 📊 **Blockchain Analytics Charts**

### 💵 **USDT Transfer Volume Chart**
- Retrieves **transactions and transfer amount** using **`getLogs` from Alchemy’s Ethereum RPC**.
- **Extracts ERC-20 `Transfer` events from Ethereum blocks**.
- Track **USDT transaction events per block**.
<br>

![USDT Transfer Volume Chart](https://github.com/user-attachments/assets/4d6b6d15-fa12-409d-b2dd-0d233830acd9)



---

### ⛽ **Base Fee per Block Chart**
- Retrieves **blocks and their baseFeePerGas** using **`getBlock` from Alchemy’s Ethereum RPC**.
- **Monitors Ethereum's base fee fluctuations per block** (EIP-1559).
- Shows how Ethereum dynamically adjusts gas prices based on network demand.
<br>

![Base Fee Chart](https://github.com/user-attachments/assets/18ac8f25-2429-49a4-ac2c-3a1e482da540)


---

### 💡 **Gas Usage and Utilization Chart**
- Retrieves **blocks, their baseFeePerGas, gasUsed and gasLimit** using **`getBlock` from Alchemy’s Ethereum RPC**.
- **Measures network congestion** by calculating **`gasUsed / gasLimit` per block**.
- Helps understand the relation between gas usage and base fee.
<br>

![Gas Usage Chart](https://github.com/user-attachments/assets/5b7806f2-2fad-4c61-9287-759cf5b5de0b)



---

### 🎯 **Project Highlights & Technical Strengths**
✔️ Demonstrates **blockchain event processing** using **Alchemy’s Ethereum RPC**.<br>
✔️ Showcases **Ethereum gas mechanics & EIP-1559** implementations.<br>
✔️ Provides real-time updates on the **most recent 10 blocks**.<br>

---

## 📩 **Let's Connect**
📧 **Email**: [abdel.hossam.m@gmail.com](mailto:abdel.hossam.m@gmail.com)  
💼 **LinkedIn**: [abdelhossam](https://www.linkedin.com/in/abdelhossam/)

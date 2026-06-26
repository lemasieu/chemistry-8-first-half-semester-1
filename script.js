// --- DATA PREPARATION ---
const NTrandom = [
    { name: 'H', M: 1 }, { name: 'He', M: 4 }, { name: 'Li', M: 7 }, { name: 'Be', M: 9 }, { name: 'B', M: 11 },
    { name: 'C', M: 12 }, { name: 'N', M: 14 }, { name: 'O', M: 16 }, { name: 'F', M: 19 }, { name: 'Ne', M: 20 },
    { name: 'Na', M: 23 }, { name: 'Mg', M: 24 }, { name: 'Al', M: 27 }, { name: 'Si', M: 28 }, { name: 'P', M: 31 },
    { name: 'S', M: 32 }, { name: 'Cl', M: 35.5 }, { name: 'Ar', M: 40 }, { name: 'K', M: 39 }, { name: 'Ca', M: 40 },
    { name: 'Au', M: 197 }, { name: 'Ag', M: 108 }, { name: 'Cu', M: 64 }
];

const PTKrandom = [
    { name: 'H2', M: 2 }, { name: 'CO2', M: 44 }, { name: 'N2', M: 28 }, { name: 'O2', M: 32 },
    { name: 'SO2', M: 64 }, { name: 'P2O5', M: 142 }, { name: 'NH3', M: 17 }, { name: 'CH4', M: 16 }
];

const PTRrandom = [
    { name: 'NaCl', M: 58.5 }, { name: 'MgO', M: 40 }, { name: 'CaCO3', M: 100 }, { name: 'CuCl2', M: 135 },
    { name: 'KNO3', M: 101 }, { name: 'AlPO4', M: 122 }, { name: 'C2H5OH', M: 46 }
];

const CTrandom = [
    { name: 'CuSO4', M: 160 }, { name: 'NaCl', M: 58.5 }, { name: 'CuCl2', M: 135 }, { name: 'KNO3', M: 101 },
    { name: 'FeCl2', M: 127 }, { name: 'NH4Cl', M: 53.5 }, { name: 'MgSO4', M: 120 }, { name: 'BaS', M: 169 }
];

// --- STATE MANAGEMENT ---
let score = 0;
let totalAnswered = 0;
let currentCategory = 'all';
let currentCorrectAnswer = '';

// --- UTILITY FUNCTIONS ---
function getRandomElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatChem(text) {
    return text.replace(/([A-Za-z]+)(\d+)/g, '$1<sub>$2</sub>').replace(/\^(\d+)/g, '<sup>$1</sup>');
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function cleanNum(num, dec = 2) {
    return parseFloat(num.toFixed(dec)).toString().replace('.', ',');
}

// --- QUESTION ENGINE ---
const questionTemplates = [
    // Tính số mol chất
    {
        id: 'Q01',
        category: 'Tính số mol chất',
        create: () => {
            const n = getRandomElem([0.5, 1, 1.5, 2, 2.5, 3, 4]);
            const nt = getRandomElem(NTrandom);
            const count = cleanNum(n * 6.022, 3);
            return {
                text: `Tính số mol nguyên tử có trong ${count}.10<sup>23</sup> nguyên tử ${formatChem(nt.name)}.`,
                correct: `${cleanNum(n)} mol`,
                options: [`${cleanNum(n)} mol`, `${cleanNum(n * 2)} mol`, `${cleanNum(n / 2)} mol`, `${cleanNum(n + 1)} mol`]
            };
        }
    },
    {
        id: 'Q02',
        category: 'Tính số mol chất',
        create: () => {
            const n = getRandomElem([0.5, 1, 1.5, 2, 3]);
            const item = getRandomElem([...PTKrandom, ...PTRrandom]);
            const ansValue = cleanNum(n * 6.022, 3);
            return {
                text: `Tính số phân tử có trong ${cleanNum(n)} mol phân tử ${formatChem(item.name)}.`,
                correct: `${ansValue}.10<sup>23</sup> phân tử`,
                options: [
                    `${ansValue}.10<sup>23</sup> phân tử`,
                    `${cleanNum(n * 5.022, 3)}.10<sup>23</sup> phân tử`,
                    `${cleanNum(n * 6.022 * 2, 3)}.10<sup>23</sup> phân tử`,
                    `${cleanNum(n, 1)}.10<sup>23</sup> phân tử`
                ]
            };
        }
    },
    {
        id: 'Q03',
        category: 'Tính số mol chất',
        create: () => {
            const n = getRandomElem([0.25, 0.5, 1, 1.5, 2, 4]);
            const item = getRandomElem([...PTKrandom, ...PTRrandom]);
            const count = cleanNum(n * 6.022, 3);
            return {
                text: `Tính số mol phân tử có trong ${count}.10<sup>23</sup> phân tử ${formatChem(item.name)}.`,
                correct: `${cleanNum(n)} mol`,
                options: [`${cleanNum(n)} mol`, `${cleanNum(n * 2)} mol`, `${cleanNum(n / 2)} mol`, `${cleanNum(n + 1.5)} mol`]
            };
        }
    },
    {
        id: 'Q04',
        category: 'Tính số mol chất',
        create: () => {
            const n = getRandomElem([0.1, 0.2, 0.5, 1, 2, 3]);
            const item = getRandomElem(PTRrandom);
            const mass = cleanNum(n * item.M);
            return {
                text: `Tính số mol phân tử có trong ${mass} gam ${formatChem(item.name)} (Biết M = ${cleanNum(item.M)} g/mol).`,
                correct: `${cleanNum(n)} mol`,
                options: [`${cleanNum(n)} mol`, `${cleanNum(n * 2)} mol`, `${cleanNum(n / 2)} mol`, `${cleanNum(n + 0.5)} mol`]
            };
        }
    },
    {
        id: 'Q05',
        category: 'Tính số mol chất',
        create: () => {
            const n = getRandomElem([0.1, 0.5, 1, 1.5, 2, 3]);
            const item = getRandomElem(PTKrandom);
            const vol = cleanNum(n * 24.79, 2);
            return {
                text: `Tính số mol phân tử có trong ${vol} lít khí ${formatChem(item.name)} ở điều kiện chuẩn.`,
                correct: `${cleanNum(n)} mol`,
                options: [`${cleanNum(n)} mol`, `${cleanNum(n * 1.5)} mol`, `${cleanNum(n / 2)} mol`, `${cleanNum(n + 1)} mol`]
            };
        }
    },
    // Chuyển đổi khối lượng, thể tích, lượng chất
    {
        id: 'Q06',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.1, 0.25, 0.5, 1, 2]);
            const item = getRandomElem(PTKrandom);
            return {
                text: `Tính thể tích ở điều kiện chuẩn (25 °C và 1 bar) của ${cleanNum(n)} mol khí ${formatChem(item.name)}.`,
                correct: `${cleanNum(n * 24.79, 2)} lít`,
                options: [`${cleanNum(n * 24.79, 2)} lít`, `${cleanNum(n * 22.4, 2)} lít`, `${cleanNum(n * 24.79 * 2, 2)} lít`, `${cleanNum(n * 12, 1)} lít`]
            };
        }
    },
    {
        id: 'Q07',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.25, 0.5, 1, 2]);
            const item = getRandomElem(PTKrandom);
            const massRaw = n * item.M;
            const mass = cleanNum(massRaw, 3);
            return {
                text: `Tính thể tích ở điều kiện chuẩn của ${mass} gam khí ${formatChem(item.name)} (M = ${item.M} g/mol).`,
                correct: `${cleanNum(n * 24.79, 2)} lít`,
                options: [`${cleanNum(n * 24.79, 2)} lít`, `${cleanNum(n * 22.4, 2)} lít`, `${cleanNum(massRaw / 24.79, 2)} lít`, `${cleanNum(n * 24.79 * 1.5, 2)} lít`]
            };
        }
    },
    {
        id: 'Q08',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.5, 1, 2]);
            const item = getRandomElem(PTKrandom);
            const atoms = cleanNum(n * 6.022, 3);
            return {
                text: `Tính thể tích ở điều kiện chuẩn của ${atoms}.10<sup>23</sup> phân tử khí ${formatChem(item.name)}.`,
                correct: `${cleanNum(n * 24.79, 2)} lít`,
                options: [`${cleanNum(n * 24.79, 2)} lít`, `${cleanNum(n * 22.4, 2)} lít`, `${cleanNum(n * 10, 1)} lít`, `${cleanNum(n * 24.79 * 2, 2)} lít`]
            };
        }
    },
    {
        id: 'Q09',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.1, 0.5, 1, 1.5, 2]);
            const item = getRandomElem([...PTKrandom, ...PTRrandom]);
            return {
                text: `Tính khối lượng (đơn vị gam) của ${cleanNum(n)} mol chất ${formatChem(item.name)} (M = ${item.M} g/mol).`,
                correct: `${cleanNum(n * item.M, 2)} gam`,
                options: [`${cleanNum(n * item.M, 2)} gam`, `${cleanNum(n * item.M * 1.2, 2)} gam`, `${cleanNum(n * item.M / 2, 2)} gam`, `${cleanNum(n * 24.79, 2)} gam`]
            };
        }
    },
    {
        id: 'Q10',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.5, 1, 2]);
            const item = getRandomElem(PTKrandom);
            const rawVol = n * 24.79;
            const vol = cleanNum(rawVol, 2);
            return {
                text: `Tính khối lượng (đơn vị gam) của ${vol} lít khí ${formatChem(item.name)} ở đkc (M = ${item.M} g/mol).`,
                correct: `${cleanNum(n * item.M, 2)} gam`,
                options: [`${cleanNum(n * item.M, 2)} gam`, `${cleanNum(rawVol * item.M, 1)} gam`, `${cleanNum(n * item.M / 2, 2)} gam`, `${cleanNum(n * 24.79, 2)} gam`]
            };
        }
    },
    {
        id: 'Q11',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n = getRandomElem([0.5, 1, 2]);
            const item = getRandomElem(PTRrandom);
            const mass = cleanNum(item.M * n, 1);
            return {
                text: `Biết ${cleanNum(n)} mol chất rắn X có khối lượng là ${mass} gam. Chất X là chất nào sau đây?`,
                correct: formatChem(item.name),
                options: [formatChem(item.name), ...PTRrandom.filter(x => x.name !== item.name).slice(0, 3).map(x => formatChem(x.name))]
            };
        }
    },
    {
        id: 'Q12',
        category: 'Chuyển đổi khối lượng, thể tích, lượng chất',
        create: () => {
            const n1 = getRandomElem([0.1, 0.2, 0.5]);
            const n2 = getRandomElem([0.3, 0.4, 0.5]);
            const g1 = getRandomElem(PTKrandom);
            let g2 = getRandomElem(PTKrandom);
            while (g1.name === g2.name) g2 = getRandomElem(PTKrandom);
            return {
                text: `Một hỗn hợp khí gồm ${cleanNum(n1)} mol khí ${formatChem(g1.name)} và ${cleanNum(n2)} mol khí ${formatChem(g2.name)}. Ở điều kiện chuẩn thì hỗn hợp này có thể tích là bao nhiêu?`,
                correct: `${cleanNum((n1 + n2) * 24.79, 2)} lít`,
                options: [`${cleanNum((n1 + n2) * 24.79, 2)} lít`, `${cleanNum((n1 + n2) * 22.4, 2)} lít`, `${cleanNum((n1 * g1.M + n2 * g2.M), 2)} lít`, `${cleanNum(n1 + n2, 2)} lít`]
            };
        }
    },
    // Tỉ khối chất khí
    {
        id: 'Q13',
        category: 'Tỉ khối chất khí',
        create: () => {
            const item = getRandomElem(PTKrandom);
            return {
                text: `Tính tỉ khối đối với không khí của khí ${formatChem(item.name)} (M = ${item.M} g/mol).`,
                correct: cleanNum(item.M / 29, 3),
                options: [cleanNum(item.M / 29, 3), cleanNum(item.M / 2, 3), cleanNum(29 / item.M, 3), cleanNum(item.M / 22.4, 3)]
            };
        }
    },
    {
        id: 'Q14',
        category: 'Tỉ khối chất khí',
        create: () => {
            const item = getRandomElem(PTKrandom);
            const d = cleanNum(item.M / 2, 2);
            return {
                text: `Tìm chất khí X biết tỉ khối của khí X so với khí hydrogen (H<sub>2</sub>) là ${d}.`,
                correct: formatChem(item.name),
                options: [formatChem(item.name), ...PTKrandom.filter(x => x.name !== item.name).slice(0, 3).map(x => formatChem(x.name))]
            };
        }
    },
    {
        id: 'Q15',
        category: 'Tỉ khối chất khí',
        create: () => {
            const item = getRandomElem(PTKrandom);
            const isHeavier = item.M > 29;
            const times = isHeavier ? cleanNum(item.M / 29, 2) : cleanNum(29 / item.M, 2);
            const correctText = isHeavier ? `Nặng hơn ${times} lần` : `Nhẹ hơn ${times} lần`;
            const wrongText = isHeavier ? `Nhẹ hơn ${times} lần` : `Nặng hơn ${times} lần`;
            return {
                text: `Khí ${formatChem(item.name)} (M = ${item.M} g/mol) nặng hơn hay nhẹ hơn không khí bao nhiêu lần?`,
                correct: correctText,
                options: [correctText, wrongText, `Nặng hơn 1,5 lần`, `Nhẹ hơn 1,5 lần`]
            };
        }
    },
    {
        id: 'Q16',
        category: 'Tỉ khối chất khí',
        create: () => {
            const pool = shuffle([...PTKrandom]).slice(0, 4);
            let minItem = pool[0];
            for (let i = 1; i < pool.length; i++) {
                if (pool[i].M < minItem.M) minItem = pool[i];
            }
            return {
                text: `Khí nào nhẹ nhất trong 4 khí sau đây: ${pool.map(x => formatChem(x.name)).join(', ')}?`,
                correct: formatChem(minItem.name),
                options: pool.map(x => formatChem(x.name))
            };
        }
    },
    // Bài toán về độ tan
    {
        id: 'Q17',
        category: 'Bài toán về độ tan',
        create: () => {
            const n = getRandomElem([50, 100, 200, 300, 500]);
            const ans = cleanNum(36.2 * n / 100, 1);
            return {
                text: `Tính khối lượng muối sodium chloride (NaCl) tối đa có thể tan trong ${n} gam nước ở 25°C. Biết rằng ở nhiệt độ này độ tan của NaCl là 36,2 gam.`,
                correct: `${ans} gam`,
                options: [`${ans} gam`, `${cleanNum(36.2)} gam`, `${cleanNum(36.2 * n)} gam`, `${cleanNum(n / 36.2, 1)} gam`]
            };
        }
    },
    {
        id: 'Q18',
        category: 'Bài toán về độ tan',
        create: () => {
            return {
                text: `Xác định nồng độ phần trăm của dung dịch muối ăn bão hòa ở nhiệt độ phòng thí nghiệm (khoảng 25 °C). Biết ở nhiệt độ này, muối ăn có độ tan là 36 gam / 100 gam H<sub>2</sub>O.`,
                correct: `26,47%`,
                options: [`26,47%`, `36,00%`, `20,50%`, `30,12%`]
            };
        }
    },
    {
        id: 'Q19',
        category: 'Bài toán về độ tan',
        create: () => {
            const n2 = getRandomElem([100, 200, 300]);
            const minN1 = 40.1 * n2 / 100;
            const n1 = Math.ceil(minN1) + getRandomInt(10, 40);
            const ans = cleanNum(40.1 * n2 / 100, 1);
            return {
                text: `Ở nhiệt độ phòng, độ tan của KCl trong nước là 40,1 g. Một dung dịch KCl nóng có chứa ${n1} g KCl trong ${n2} g nước được làm nguội về nhiệt độ phòng thấy có KCl rắn tách ra. Có bao nhiêu gam KCl còn lại trong dung dịch?`,
                correct: `${ans} gam`,
                options: [`${ans} gam`, `${cleanNum(n1)} gam`, `${cleanNum(n1 - minN1, 1)} gam`, `${cleanNum(n2)} gam`]
            };
        }
    },
    {
        id: 'Q20',
        category: 'Bài toán về độ tan',
        create: () => {
            const n2 = getRandomElem([100, 200, 300]);
            const minN1 = 40.1 * n2 / 100;
            const n1 = Math.ceil(minN1) + getRandomInt(10, 40);
            const ans = cleanNum(n1 - minN1, 1);
            return {
                text: `Ở nhiệt độ phòng, độ tan của KCl trong nước là 40,1 g. Một dung dịch KCl nóng có chứa ${n1} g KCl trong ${n2} g nước được làm nguội về nhiệt độ phòng thấy có KCl rắn tách ra. Có bao nhiêu gam KCl rắn bị tách ra khỏi dung dịch?`,
                correct: `${ans} gam`,
                options: [`${ans} gam`, `${cleanNum(minN1, 1)} gam`, `${cleanNum(n1)} gam`, `${cleanNum(0)} gam`]
            };
        }
    },
    {
        id: 'Q21',
        category: 'Bài toán về độ tan',
        create: () => {
            const n = getRandomElem([15, 30, 45, 60]);
            const water = cleanNum(n * 100 / 30, 1);
            return {
                text: `Tính độ tan của K<sub>2</sub>CO<sub>3</sub> trong nước ở 20°C. Biết rằng ở nhiệt độ này hòa tan hết ${n} gam muối trong ${water} gam nước thu được dung dịch bão hòa.`,
                correct: `30 gam/100 gam H2O`,
                options: [`30 gam/100 gam H2O`, `${n} gam/100 gam H2O`, `45 gam/100 gam H2O`, `25 gam/100 gam H2O`]
            };
        }
    },
    {
        id: 'Q22',
        category: 'Bài toán về độ tan',
        create: () => {
            const n1 = getRandomElem([8, 16, 64, 128]);
            const water = cleanNum(n1 * 100 / 32, 1);
            return {
                text: `Ở 25 °C, ${water} gam nước có thể hòa tan tối đa ${n1} gam KNO<sub>3</sub>. Độ tan của KNO<sub>3</sub> ở nhiệt độ này là bao nhiêu?`,
                correct: `32 g / 100g H2O`,
                options: [`32 g / 100g H2O`, `${n1} g / 100g H2O`, `100 g / 100g H2O`, `50 g / 100g H2O`]
            };
        }
    },
    {
        id: 'Q23',
        category: 'Bài toán về độ tan',
        create: () => {
            return {
                text: `Ở 25 °C, độ tan của AgNO<sub>3</sub> trong nước là 222 g. Nồng độ phần trăm của dung dịch AgNO<sub>3</sub> bão hoà ở nhiệt độ này là bao nhiêu?`,
                correct: `68,94%`,
                options: [`68,94%`, `22,20%`, `45,50%`, `50,00%`]
            };
        }
    },
    {
        id: 'Q24',
        category: 'Bài toán về độ tan',
        create: () => {
            const n2 = 100;
            const type = getRandomElem(['bão hòa', 'chưa bão hòa', 'quá bão hòa']);
            let n1 = 36;
            if (type === 'chưa bão hòa') n1 = 20;
            if (type === 'quá bão hòa') n1 = 45;

            let correctAns = "Dung dịch bão hòa";
            if (type === 'chưa bão hòa') correctAns = "Dung dịch chưa bão hòa";
            if (type === 'quá bão hòa') correctAns = "Dung dịch quá bão hòa";

            return {
                text: `Độ tan của NaCl trong nước ở 20°C là 36 gam. Khi hòa tan ${n1} gam NaCl vào ${n2} gam nước thì thu được dung dịch loại nào?`,
                correct: correctAns,
                options: ["Dung dịch chưa bão hòa", "Dung dịch bão hòa", "Dung dịch quá bão hòa"]
            };
        }
    },
    {
        id: 'Q25',
        category: 'Bài toán về độ tan',
        create: () => {
            const n1 = getRandomInt(40, 60);
            const n2 = getRandomInt(100, 150);
            const n3 = getRandomInt(5, 15);
            const ans = cleanNum((n1 - n3) / n2 * 100, 2);
            return {
                text: `Ở nhiệt độ 25°C, khi cho ${n1} gam muối X vào ${n2} gam nước, khuấy kĩ thì còn lại ${n3} gam muối không tan. Độ tan của muối X là bao nhiêu?`,
                correct: `${ans} g/100g H2O`,
                options: [`${ans} g/100g H2O`, `${cleanNum(n1 - n3)} g/100g H2O`, `${cleanNum(n1 / n2 * 100)} g/100g H2O`, `${cleanNum(n3)} g/100g H2O`]
            };
        }
    },
    // Bài tập về nồng độ phần trăm
    {
        id: 'Q26',
        category: 'Bài tập về nồng độ phần trăm',
        create: () => {
            const n1 = getRandomElem([1, 2, 3]);
            return {
                text: `Hòa tan ${n1 * 25} gam CuSO<sub>4</sub>.5H<sub>2</sub>O vào ${375 * n1} gam nước. Tính nồng độ phần trăm của dung dịch thu được (M CuSO<sub>4</sub> = 160 g/mol, M H<sub>2</sub>O = 18 g/mol).`,
                correct: `4%`,
                options: [`4%`, `6%`, `5%`, `10%`]
            };
        }
    },
    {
        id: 'Q27',
        category: 'Bài tập về nồng độ phần trăm',
        create: () => {
            const n1 = getRandomElem([10, 20, 30, 50]);
            return {
                text: `Hòa tan ${n1} gam NaCl vào ${9 * n1} gam nước thì thu được dung dịch có nồng độ phần trăm là bao nhiêu?`,
                correct: `10%`,
                options: [`10%`, `11,1%`, `5%`, `9%`]
            };
        }
    },
    {
        id: 'Q28',
        category: 'Bài tập về nồng độ phần trăm',
        create: () => {
            const n1 = getRandomElem([0.1, 0.2, 0.4, 0.5]);
            const ansRaw = (n1 * 58.5) / 400 * 100;
            const ans = cleanNum(ansRaw, 2);
            return {
                text: `Nồng độ phần trăm của 400 gam dung dịch chứa ${cleanNum(n1)} mol NaCl là bao nhiêu?`,
                correct: `${ans}%`,
                options: [`${ans}%`, `${cleanNum(n1 * 10)}%`, `${cleanNum(ansRaw * 1.5, 2)}%`, `5,85%`]
            };
        }
    },
    {
        id: 'Q29',
        category: 'Bài tập về nồng độ phần trăm',
        create: () => {
            const n1 = getRandomElem([10, 20, 40, 50]);
            const m_dd = 2000 / n1;
            const ansRaw = m_dd - 20;
            const ans = cleanNum(ansRaw, 1);
            return {
                text: `Cần bao nhiêu gam nước để pha chế được ${cleanNum(m_dd, 1)} gam dung dịch BaCl<sub>2</sub> nồng độ ${n1}%?`,
                correct: `${ans} gam`,
                options: [`${ans} gam`, `20 gam`, `${cleanNum(m_dd)} gam`, `${cleanNum(ansRaw - 10)} gam`]
            };
        }
    },
    // Bài tập về nồng độ mol
    {
        id: 'Q30',
        category: 'Bài tập về nồng độ mol',
        create: () => {
            const n1 = getRandomElem([0.1, 0.2, 0.25, 0.5]);
            const n2 = getRandomElem([200, 500, 1000, 2000]);
            const ct = getRandomElem(CTrandom);
            const mass = cleanNum(n1 * ct.M, 1);
            const ansRaw = n1 * 1000 / n2;
            const ans = cleanNum(ansRaw, 2);
            return {
                text: `Hòa tan hoàn toàn ${mass} gam ${formatChem(ct.name)} (M = ${ct.M} g/mol) vào nước thu được ${n2} ml dung dịch. Tính nồng độ mol của dung dịch này.`,
                correct: `${ans} M`,
                options: [`${ans} M`, `${cleanNum(ansRaw * 2)} M`, `${cleanNum(ansRaw / 2)} M`, `1,0 M`]
            };
        }
    },
    {
        id: 'Q31',
        category: 'Bài tập về nồng độ mol',
        create: () => {
            const n1 = getRandomElem([0.01, 0.02, 0.05]);
            const n2 = getRandomElem([0.2, 0.5, 0.8]);
            const ct = getRandomElem(CTrandom);
            const ansRaw = (2 * n1 + 3 * n2) / 5;
            const ansValue = cleanNum(ansRaw, 3);
            return {
                text: `Trộn lẫn 2 lít dung dịch ${formatChem(ct.name)} ${cleanNum(n1)} M với 3 lít dung dịch ${formatChem(ct.name)} ${cleanNum(n2)} M thu được 5 lít dung dịch C. Tính nồng độ mol của dung dịch C.`,
                correct: `${ansValue} M`,
                options: [`${ansValue} M`, `${cleanNum((n1 + n2) / 2, 2)} M`, `${cleanNum(ansRaw * 1.2, 3)} M`, `${cleanNum(n1 + n2)} M`]
            };
        }
    },
    {
        id: 'Q32',
        category: 'Bài tập về nồng độ mol',
        create: () => {
            const n2 = getRandomElem([200, 300, 500, 1000]);
            const n3 = getRandomElem([0.1, 0.2, 0.5, 1]);
            const ct = getRandomElem(CTrandom);
            const ansRaw = n3 * (n2 / 1000) * ct.M;
            const ans = cleanNum(ansRaw, 2);
            return {
                text: `Tính khối lượng ${formatChem(ct.name)} (M = ${ct.M} g/mol) có trong ${n2} ml dung dịch có nồng độ ${cleanNum(n3)} M.`,
                correct: `${ans} gam`,
                options: [`${ans} gam`, `${cleanNum(ansRaw * 2)} gam`, `${cleanNum(ansRaw / 2)} gam`, `${cleanNum(n3 * ct.M)} gam`]
            };
        }
    },
    {
        id: 'Q33',
        category: 'Bài tập về nồng độ mol',
        create: () => {
            const n1 = getRandomElem([0.2, 0.25, 0.5]);
            const n2 = getRandomElem([500, 1000]);
            const ct = getRandomElem(CTrandom);
            const mass = cleanNum(n1 * ct.M, 1);

            const cm_init = n1 / (n2 / 1000);
            const ansRaw = (cm_init * 100 / 0.1) - 100;
            const ans = cleanNum(ansRaw, 0);

            return {
                text: `Hòa tan ${mass} gam ${formatChem(ct.name)} vào nước để được ${n2} ml dung dịch. Cần thêm bao nhiêu ml nước vào 100 ml dung dịch này để được dung dịch có nồng độ 0,1 M?`,
                correct: `${ans} ml`,
                options: [`${ans} ml`, `${cleanNum(ansRaw * 1.5, 0)} ml`, `${cleanNum(ansRaw / 2, 0)} ml`, `100 ml`]
            };
        }
    }
];

// --- CORE APPLICATION LOGIC ---
function selectCategory(category) {
    currentCategory = category;

    // Toggle Active UI Menu class
    const buttons = document.querySelectorAll('.category-item');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    generateQuestion();
}

function generateQuestion() {
    // Hide next button, clear old options
    document.getElementById('nextBtn').style.display = 'none';
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    // Filter questions based on category
    let filtered = questionTemplates;
    if (currentCategory !== 'all') {
        filtered = questionTemplates.filter(q => q.category === currentCategory);
    }

    // Get random question item
    const template = getRandomElem(filtered);
    const qData = template.create();

    // Render text
    document.getElementById('questionCategory').innerText = template.category;
    document.getElementById('questionText').innerHTML = qData.text;
    currentCorrectAnswer = qData.correct;

    // Render options randomly shuffled
    const uniqueOptions = [...new Set(qData.options)];
    // In case correct answer isn't in options due to pool bugs, ensure safety
    if (!uniqueOptions.includes(qData.correct)) uniqueOptions[0] = qData.correct;

    shuffle(uniqueOptions);

    uniqueOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;
        btn.onclick = () => handleAnswerSelect(btn, opt, qData.text);
        container.appendChild(btn);
    });
}

function handleAnswerSelect(selectedBtn, chosenOpt, questionTextMarkup) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true); // Disable all

    totalAnswered++;
    let isCorrect = false;

    if (chosenOpt === currentCorrectAnswer) {
        selectedBtn.classList.add('correct');
        score++;
        isCorrect = true;
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight correct one
        allButtons.forEach(btn => {
            if (btn.innerHTML === currentCorrectAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Update stats view
    document.getElementById('correctCount').innerText = score;
    document.getElementById('totalCount').innerText = totalAnswered;
    document.getElementById('accuracyRate').innerText = cleanNum((score / totalAnswered) * 100, 1) + '%';

    // Log to History list
    logHistory(questionTextMarkup, currentCorrectAnswer, isCorrect);

    // Display Next button
    document.getElementById('nextBtn').style.display = 'block';
}

function logHistory(qText, correctAns, isCorrect) {
    const list = document.getElementById('historyList');
    const item = document.createElement('div');
    item.className = `history-item ${isCorrect ? 'correct-item' : 'wrong-item'}`;

    // Extract text layout smoothly
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = qText;
    const textSnippet = tempDiv.innerText.substring(0, 60) + '...';

    item.innerHTML = `
                <div>
                    <strong>${textSnippet}</strong><br>
                    <span style="color: var(--text-muted); font-size: 0.8rem">Đáp án đúng: ${correctAns}</span>
                </div>
                <span class="history-status ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? 'Đúng' : 'Sai'}</span>
            `;

    list.insertBefore(item, list.firstChild);
}

// Initialize First Question
window.onload = () => {
    generateQuestion();
};
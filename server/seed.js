import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

console.log('Using MongoDB URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@') : 'undefined');

const products = [
    // Laptops
    // {
    //     name: "HP 15s AMD Ryzen 5 Quad Core 7520U - (16 GB/512 GB SSD/Windows 11 Home) 15-fc0030AU | 15-fc0690AU Thin and Light Laptop (15.6 Inch, Natural Silver, 1.75 Kg, With MS Office)",
    //     category: "Laptops",
    //     price: 43990,
    //     rating: 5,
    //     image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/5/t/5/-original-imahjy5hggcxnttg.jpeg?q=90",
    //     images: [
    //         "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/o/w/h/-original-imahjy5hfgy3zkwd.jpeg?q=90",
    //         "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/l/f/c/-original-imahjy5hufhrpdxz.jpeg?q=90",
    //         "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/t/o/t/-original-imahjy5hxktfzhdt.jpeg?q=90",
    //         "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/g/1/j/-original-imahjy5hayg5nzfv.jpeg?q=90",
    //         "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/k/t/l/-original-imahjy5hhzz7uzhe.jpeg?q=90"
    //     ],
    //     description: "HP 15s Thin and Light Laptop featuring AMD Ryzen 5 Quad Core 7520U processor, 16GB LPDDR5 RAM, and 512GB SSD storage. It comes with Windows 11 Home and MS Office pre-installed, offering a smooth experience for work and entertainment on its 15.6-inch Full HD display.",
    //     specs: {
    //         "Processor": "AMD Ryzen 5 Quad Core 7520U",
    //         "RAM": "16 GB LPDDR5",
    //         "Storage": "512 GB SSD",
    //         "Display": "39.62 cm (15.6 Inch) Full HD",
    //         "Graphics": "AMD Radeon Graphics",
    //         "Weight": "1.75 Kg",
    //         "OS": "Windows 11 Home",
    //         "Software": "Microsoft Office Home & Student 2021"
    //     },
    // },
    {
        name: "HP 15s AMD Ryzen 5 Quad Core 7520U - (16 GB/512 GB SSD/Windows 11 Home) 15-fc0030AU | 15-fc0690AU Thin and Light Laptop (15.6 Inch, Natural Silver, 1.75 Kg, With MS Office)",
        category: "Laptops",
        price: 46990,
        rating: 4.8,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/5/t/5/-original-imahjy5hggcxnttg.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/o/w/h/-original-imahjy5hfgy3zkwd.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/l/f/c/-original-imahjy5hufhrpdxz.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/t/o/t/-original-imahjy5hxktfzhdt.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/g/1/j/-original-imahjy5hayg5nzfv.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/k/t/l/-original-imahjy5hhzz7uzhe.jpeg?q=90"
        ],
        description: "HP 15s Thin and Light Laptop powered by AMD Ryzen 5 7520U processor with 16GB LPDDR5 RAM and 512GB SSD storage. Designed for smooth multitasking, office work, and entertainment, it features a 15.6-inch Full HD display, Windows 11 Home, and Microsoft Office pre-installed. Lightweight design makes it perfect for students and professionals.",
        specs: {
            "Processor": "AMD Ryzen 5 Quad Core 7520U",
            "Cores": "4 Cores",
            "Clock Speed": "2.8 GHz Up to 4.3 GHz",
            "Cache": "4 MB",
            "RAM": "16 GB LPDDR5",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Display": "15.6 Inch Full HD",
            "Graphics": "AMD Radeon Graphics",
            "Operating System": "Windows 11 Home",
            "Software": "Microsoft Office Home & Student",
            "Weight": "1.75 Kg",
            "Color": "Natural Silver"
        },
    },
    {
        name: "HP Intel Celeron Dual Core N4500 - (8 GB/512 GB SSD/Windows 11 Home) 14s-dq3149TU / 14s-dq3141TU Thin and Light Laptop (14 Inch, Jet Black, 1.46 Kg, With MS Office)",
        category: "Laptops",
        price: 34990,
        rating: 4.3,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/y/l/z/-original-imahgfdygxgqfwym.jpeg?q=90",
        images: ["https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/y/l/z/-original-imahgfdygxgqfwym.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/a/p/-original-imahgfdye2qyvzhw.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/s/e/z/-original-imahgfdyvzyjrzgn.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/t/k/5/-original-imahgfdykbwmg9hy.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/9/q/m/-original-imahgfdyxyexkfzf.jpeg?q=90"
        ],
        description: "HP 14s Thin and Light Laptop powered by Intel Celeron Dual Core N4500 processor with 8GB DDR4 RAM and 512GB SSD storage. Designed for everyday tasks, online classes, and office work, it features a compact 14-inch display, Windows 11 Home, and Microsoft Office pre-installed in a stylish Jet Black finish.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Celeron Dual Core N4500",
            "Cores": "2",
            "Clock Speed": "Up to 2.8 GHz",
            "Cache": "4 MB",
            "Chipset": "Intel Integrated SoC",
            "RAM": "8 GB DDR4",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Graphics": "Intel Integrated UHD Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "14 Inch",
            "Weight": "1.46 Kg",
            "Color": "Jet Black"
        },
    },
    {
        name: "HP Chromebook Intel Celeron Quad Core N4120 - (4 GB/64 GB EMMC Storage/Chrome OS) 14a-ca0504TU Chromebook (14 Inch, Forest Teal, 1.49 Kg)",
        category: "Laptops",
        price: 21900,
        rating: 4.2,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/e/7/s/-original-imagykgqacv2ez2g.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/kzogn0w0/computer/v/i/a/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt66q4uthhu.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/kzogn0w0/computer/g/e/f/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt68rsggu2z.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/kzogn0w0/computer/b/n/s/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt6gkhcjmtt.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/kzogn0w0/computer/m/g/g/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt6heyy8dmu.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/kzogn0w0/computer/t/l/1/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt6cpgp5zm4.jpeg?q=90"
        ],
        description: "HP Chromebook powered by Intel Celeron Quad Core N4120 processor with 4GB LPDDR4 RAM and 64GB eMMC storage. Designed for web browsing, online classes, and everyday productivity, it runs on Chrome OS and offers fast boot time with a compact and lightweight 14-inch design in Forest Teal color.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Celeron Quad Core N4120",
            "Cores": "4",
            "Clock Speed": "Up to 2.8 GHz",
            "Cache": "4 MB",
            "RAM": "4 GB LPDDR4",
            "RAM Frequency": "2400 MHz",
            "Storage": "64 GB eMMC",
            "Storage Type": "eMMC",
            "Graphics": "Intel Integrated UHD Graphics",
            "Operating System": "Chrome OS",
            "Display": "14 Inch",
            "Weight": "1.49 Kg",
            "Color": "Forest Teal"
        },
    },
    {
        name: "HP 15s AMD Ryzen 3 Quad Core 5300U - (8 GB/512 GB SSD/Windows 11 Home) 15s-eq2143au Thin and Light Laptop (15.6 Inch, Natural Silver, 1.69 Kg, With MS Office)",
        category: "Laptops",
        price: 39990,
        rating: 4.4,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/p/r/h/-original-imahg5fwhzmp2qnh.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/d/8/3/-original-imahg5fwvwzdskhw.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/m/u/x/-original-imahg5fwgcrwpbfk.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/z/u/z/-original-imahg2m67s74ydfq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/0/u/q/-original-imahg88r7qpgr4gq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/w/z/i/-original-imahg5fwpfrwh2ny.jpeg?q=90",
        ],
        description: "HP 15s Thin and Light Laptop powered by AMD Ryzen 3 5300U processor with 8GB DDR4 RAM and 512GB SSD storage. It delivers smooth performance for multitasking, office work, and entertainment. Comes with Windows 11 Home and Microsoft Office pre-installed, featuring a stylish Natural Silver finish and lightweight design.",
        specs: {
            "Processor Brand": "AMD",
            "Processor": "Ryzen 3 Quad Core 5300U",
            "Cores": "4",
            "Clock Speed": "2.6 GHz with Turbo Boost up to 3.8 GHz",
            "Cache": "4 MB",
            "RAM": "8 GB DDR4",
            "RAM Frequency": "3200 MHz",
            "Expandable Memory": "Yes",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Graphics": "AMD Radeon Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "15.6 Inch",
            "Weight": "1.69 Kg",
            "Color": "Natural Silver"
        },
    },
    {
        name: "HP Envy x360 Intel Core i5 12th Gen 1235U - (16 GB/512 GB SSD/Windows 11 Home) 15-ew0041TU Thin and Light Laptop (15.6 Inch, Natural Silver, 1.6 Kg, With MS Office)",
        category: "Laptops",
        price: 82990,
        rating: 4.6,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/l/d/w/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvykqf9ywpda.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/8/8/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvyk42kd5kyx.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/n/h/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvykkaftvjvh.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/c/z/i/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvykprthbhbz.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/j/k/e/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvyknyd38mzu.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/6/k/0/15-ew0041tu-thin-and-light-laptop-hp-original-imagsvykkgshhncb.jpeg?q=90"
        ],
        description: "HP Envy x360 Thin and Light Laptop powered by 12th Gen Intel Core i5 1235U processor with 16GB DDR4 RAM and 512GB SSD storage. Designed for performance and versatility, it features a 15.6-inch display, Intel Iris Xe Graphics, and a premium Natural Silver finish. Comes with Windows 11 Home and Microsoft Office pre-installed, making it ideal for professionals and creators.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Core i5 12th Gen 1235U",
            "Processor Generation": "12th Gen",
            "Clock Speed": "1.3 GHz with Turbo Boost up to 4.4 GHz",
            "RAM": "16 GB DDR4",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Graphics": "Intel Iris Xe Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "15.6 Inch",
            "Weight": "1.6 Kg",
            "Color": "Natural Silver"
        },
    },
    {
        name: "HP Envy x360 Creator Evo Intel Core i5 12th Gen 1230U - (8 GB/512 GB SSD/Windows 11 Home) x360 13-bf0085TU Thin and Light Laptop (13.3 Inch, Natural Silver, 1.31 Kg, With MS Office)",
        category: "Laptops",
        price: 72599,
        rating: 4.5,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/b/f/g/-original-imahg5fxbfcfjtgc.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/h/7/u/-original-imahg5fx9t9wakdq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/c/q/p/-original-imahg5fx7hf2ujkw.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/z/u/z/-original-imahg2m67s74ydfq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/0/u/q/-original-imahg88r7qpgr4gq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/l/e/-original-imahg5fxjhwxncja.jpeg?q=90",
        ],
        description: "HP Envy x360 Creator Evo powered by 12th Gen Intel Core i5 1230U processor with 8GB LPDDR4X RAM and 512GB SSD storage. This compact 13.3-inch convertible laptop delivers strong performance with Intel Iris Xe Graphics, making it ideal for creators and professionals. It comes with Windows 11 Home and Microsoft Office pre-installed in a sleek Natural Silver finish.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Core i5 12th Gen 1230U",
            "Processor Generation": "12th Gen",
            "Clock Speed": "Max Frequency up to 4.4 GHz",
            "RAM": "8 GB LPDDR4X",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Graphics": "Intel Iris Xe Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "13.3 Inch",
            "Weight": "1.31 Kg",
            "Color": "Natural Silver"
        },
    },
    {
        name: "Lenovo IdeaPad 3 Chrome Intel Celeron Dual Core N4500 - (8 GB/128 GB eMMC Storage/Chrome OS) 15IJL6 Chromebook (15.6 Inch, Arctic Grey, 1.58 Kg)",
        category: "Laptops",
        price: 18990,
        rating: 4.1,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/c/q/e/-original-imah58wkmru6vp4r.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/t/o/v/-original-imah58wkbczzybgn.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/w/m/6/-original-imah58wk5fqtmsec.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/h/a/j/-original-imah58wk6vfjdsuf.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/z/j/h/-original-imah58wknqhmjumj.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/m/f/r/-original-imah58wkqeyhbxf5.jpeg?q=90",
        ],
        description: "Lenovo IdeaPad 3 Chromebook powered by Intel Celeron Dual Core N4500 processor with 8GB LPDDR4X RAM and 128GB eMMC storage. Designed for students and everyday productivity, it runs on Chrome OS with fast boot times and smooth web performance. The 15.6-inch display and lightweight Arctic Grey design make it ideal for online classes and browsing.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Celeron Dual Core N4500",
            "Cores": "2",
            "Clock Speed": "Max Frequency up to 2.8 GHz",
            "RAM": "8 GB LPDDR4X",
            "Storage": "128 GB eMMC",
            "Storage Type": "eMMC",
            "Graphics": "Intel Integrated UHD Graphics",
            "Operating System": "Chrome OS",
            "Display": "15.6 Inch",
            "Weight": "1.58 Kg",
            "Color": "Arctic Grey"
        },
    },
    {
        name: "Lenovo Chromebook MediaTek Kompanio 520 - (4 GB/128 GB eMMC Storage/Chrome OS) 14M868 Chromebook (14 Inch, Abyss Blue, 1.3 Kg)",
        category: "Laptops",
        price: 16999,
        rating: 4.0,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/k/3/v/-original-imahgfdfysyznaan.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/9/k/h/-original-imahgfdfjwg3jd7c.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/p/f/-original-imahgfdffccfuynr.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/8/r/f/-original-imahgfdfgwtzhsah.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/x/u/p/-original-imahgfdfbmxzyhdr.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/u/v/h/-original-imahgfdfhhr6ggp2.jpeg?q=90"
        ],
        description: "Lenovo Chromebook powered by MediaTek Kompanio 520 processor with 4GB LPDDR4X RAM and 128GB eMMC storage. Designed for everyday tasks, online classes, and browsing, it runs on Chrome OS for fast and secure performance. The lightweight 14-inch design in Abyss Blue makes it portable and ideal for students.",
        specs: {
            "Processor Brand": "MediaTek",
            "Processor": "MediaTek Kompanio 520",
            "RAM": "4 GB LPDDR4X",
            "Storage": "128 GB eMMC",
            "Storage Type": "eMMC",
            "Graphics": "MediaTek Integrated ARM Mali-G52 2EE MC2",
            "Operating System": "Chrome OS",
            "Display": "14 Inch",
            "Weight": "1.3 Kg",
            "Color": "Abyss Blue"
        },
    },
    {
        name: "Lenovo Chromebook Duet 11M889 MediaTek Kompanio 838 - (8 GB/128 GB eMMC Storage/Chrome OS) Chromebook Duet 11M889 (27.81 cm, Luna Grey, 1.101 Kg)",
        category: "Laptops",
        price: 19990,
        rating: 4.3,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/g/j/9/-original-imahgfdfgchekzvf.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/z/d/j/-original-imahgfdfprywjkzd.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/e/d/s/-original-imahgfdfdnhktyeu.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/p/w/-original-imahgfdfzzpf5kpd.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/7/y/w/-original-imahgfdfjyusyt6y.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/f/p/-original-imahgfdfj7cqqz6p.jpeg?q=90"
        ],
        description: "Lenovo Chromebook Duet 11M889 powered by MediaTek Kompanio 838 processor with 8GB LPDDR4X RAM and 128GB eMMC storage. Designed for portability and productivity, it runs on Chrome OS and features an ultra-lightweight build. Ideal for students and professionals who need a compact and efficient device in Luna Grey finish.",
        specs: {
            "Processor Brand": "MediaTek",
            "Processor": "MediaTek Kompanio 838",
            "Cores": "8",
            "Chipset": "MediaTek SoC Platform",
            "RAM": "8 GB LPDDR4X",
            "Storage": "128 GB eMMC",
            "Storage Type": "eMMC",
            "Graphics": "MediaTek Integrated ARM Mali-G57 MC3",
            "Operating System": "Chrome OS",
            "Display": "27.81 cm",
            "Weight": "1.101 Kg",
            "Color": "Luna Grey"
        },
    },
    {
        name: "Lenovo V15 AMD Ryzen 3 Quad Core 7320U - (8 GB/512 GB SSD/Windows 11 Home) V15 G4 AMN 1 Thin and Light Laptop (15.6 Inch, Arctic Grey, 1.65 Kg)",
        category: "Laptops",
        price: 31900,
        rating: 4.2,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/6/u/-original-imahg5fwfhfwfejz.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/6/u/-original-imahg5fwfhfwfejz.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/g/k/t/-original-imahg5fw7btzfdqg.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/z/u/z/-original-imahg2m67s74ydfq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/0/u/q/-original-imahg88r7qpgr4gq.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/i/r/m/-original-imahg5fwhktgcxkg.jpeg?q=90"
        ],
        description: "Lenovo V15 G4 AMN 1 powered by AMD Ryzen 3 7320U processor with 8GB LPDDR5 RAM and 512GB SSD storage. Designed for smooth multitasking and everyday productivity, it features a 15.6-inch display, Windows 11 Home, and a sleek Arctic Grey finish. Ideal for students and professionals seeking reliable performance at an affordable price.",
        specs: {
            "Processor Brand": "AMD",
            "Processor": "Ryzen 3 Quad Core 7320U",
            "Cores": "4",
            "Clock Speed": "2.4 GHz up to max turbo frequency at 4.1 GHz",
            "RAM": "8 GB LPDDR5",
            "Expandable Memory": "Up to 8 GB",
            "Storage": "512 GB SSD",
            "Expandable SSD Capacity": "Up to 512 GB",
            "Storage Type": "SSD",
            "Graphics": "AMD Radeon Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "15.6 Inch",
            "Weight": "1.65 Kg",
            "Color": "Arctic Grey"
        },
    },
    {
        name: "Lenovo V 14 (2025) Intel Core i3 13th Gen 1315U - (16 GB/512 GB SSD/Windows 11 Home) V 14 Thin and Light Laptop (14 Inch, Iron Grey, 1.4 Kg, With MS Office)",
        category: "Laptops",
        price: 45990,
        rating: 4.4,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/3/r/c/v-14-thin-and-light-laptop-lenovo-original-imahf4ngzwzbe4xd.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/6/3/x/v-series-thin-and-light-laptop-lenovo-original-imah7yek6fbyjg5p.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/t/n/v-series-thin-and-light-laptop-lenovo-original-imah7yekqkhapdfg.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/8/g/y/v-14-thin-and-light-laptop-lenovo-original-imahf4ngka2hgt2f.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/m/i/n/v-series-thin-and-light-laptop-lenovo-original-imah7yekwfghr2f5.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/6/3/x/v-series-thin-and-light-laptop-lenovo-original-imah7yek6fbyjg5p.jpeg?q=90"
        ],
        description: "Lenovo V 14 (2025) powered by 13th Gen Intel Core i3 1315U processor with 16GB DDR4 RAM and 512GB SSD storage. Designed for smooth multitasking and professional use, it features a compact 14-inch display, Windows 11 Home, and Microsoft Office pre-installed. The sleek Iron Grey finish and lightweight build make it ideal for work and daily productivity.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Core i3 13th Gen 1315U",
            "Processor Generation": "13th Gen",
            "Clock Speed": "Max Turbo Frequency up to 4.5 GHz",
            "Cache": "10 MB",
            "RAM": "16 GB DDR4",
            "RAM Frequency": "3200 MHz",
            "Memory Slots": "2",
            "Expandable Memory": "Up to 32 GB",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Operating System": "Windows 11 Home",
            "Display": "14 Inch",
            "Weight": "1.4 Kg",
            "Color": "Iron Grey"
        },
    },
    {
        name: "Lenovo V 14 (2025) Intel Core i3 13th Gen 1315U - (16 GB/512 GB SSD/Windows 11 Home) V 14 Thin and Light Laptop (14 Inch, Iron Grey, 1.4 Kg, With MS Office)",
        category: "Laptops",
        price: 43990,
        rating: 4.4,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/3/r/c/v-14-thin-and-light-laptop-lenovo-original-imahf4ngzwzbe4xd.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/6/3/x/v-series-thin-and-light-laptop-lenovo-original-imah7yek6fbyjg5p.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/t/n/v-series-thin-and-light-laptop-lenovo-original-imah7yekqkhapdfg.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/8/g/y/v-14-thin-and-light-laptop-lenovo-original-imahf4ngka2hgt2f.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/m/i/n/v-series-thin-and-light-laptop-lenovo-original-imah7yekwfghr2f5.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/r/t/n/v-series-thin-and-light-laptop-lenovo-original-imah7yekqkhapdfg.jpeg?q=90"
        ],
        description: "Lenovo V 14 (2025) powered by 13th Gen Intel Core i3 1315U processor with 16GB DDR4 RAM and 512GB SSD storage. Built for smooth multitasking and office productivity, it features a 14-inch display, Windows 11 Home, and Microsoft Office pre-installed. The sleek Iron Grey design and lightweight build make it ideal for professionals and students.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Core i3 13th Gen 1315U",
            "Processor Generation": "13th Gen",
            "Clock Speed": "Max Turbo Frequency up to 4.5 GHz",
            "Cache": "10 MB",
            "RAM": "16 GB DDR4",
            "RAM Frequency": "3200 MHz",
            "Memory Slots": "2",
            "Expandable Memory": "Up to 32 GB",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Operating System": "Windows 11 Home",
            "Display": "14 Inch",
            "Weight": "1.4 Kg",
            "Color": "Iron Grey"
        },
    },
    {
        name: "HP Intel Core i3 13th Gen 1315U - (8 GB/512 GB SSD/Windows 11 Home) 15-fd0569TU Thin and Light Laptop (15.6 Inch, Natural Silver, 1.59 Kg, With MS Office)",
        category: "Laptops",
        price: 39990,
        rating: 4.3,
        image: "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/q/b/y/-original-imahbpzxs7jyyvnh.jpeg?q=90",
        images: [
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/n/a/m/-original-imahbpzx74kp2wfy.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/s/b/w/-original-imahbpzx9bdav3gt.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/8/c/q/-original-imahbpzxwgm7mryc.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/w/u/s/-original-imahbpzxtrsywxxu.jpeg?q=90",
            "https://rukminim1.flixcart.com/image/1424/1424/xif0q/computer/d/u/w/-original-imahbpzjzfp2y6ep.jpeg?q=90",
        ],
        description: "HP 15 Thin and Light Laptop powered by 13th Gen Intel Core i3 1315U processor with 8GB DDR4 RAM and 512GB SSD storage. Designed for smooth everyday performance, multitasking, and office productivity, it features a 15.6-inch display and comes with Windows 11 Home and Microsoft Office pre-installed in an elegant Natural Silver finish.",
        specs: {
            "Processor Brand": "Intel",
            "Processor": "Core i3 13th Gen 1315U",
            "Processor Generation": "13th Gen",
            "Cores": "6",
            "Clock Speed": "Up to 4.5 GHz",
            "Cache": "10 MB",
            "Chipset": "Intel Integrated SoC",
            "RAM": "8 GB DDR4",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Graphics": "Intel Integrated UHD Graphics",
            "Operating System": "Windows 11 Home",
            "Display": "15.6 Inch",
            "Weight": "1.59 Kg",
            "Color": "Natural Silver"
        },
    },
    {
        name: "Apple MacBook Air M2 - (16 GB/256 GB SSD/macOS Sequoia) MC7X4HN/A (13.6 Inch, Midnight, 1.24 Kg)",
        category: "Laptops",
        price: 71990,
        rating: 4.7,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/f/j/g/-original-imahfthtkkzyazkf.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/s/i/i/-original-imahggeqx5fyzxeg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/v/f/b/-original-imahggerxh8bhhu9.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/n/9/s/-original-imahggerqfen8mgg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/r/3/1/-original-imahggerhuhqtpkz.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/d/t/h/-original-imahggeqne6hpatw.jpeg?q=90",
        ],
        description: "Apple MacBook Air powered by the Apple M2 chip with 16GB Unified Memory and 256GB SSD storage. It features a stunning 13.6-inch display in a sleek and lightweight Midnight finish. Designed for powerful performance, efficiency, and portability, it runs on macOS Sequoia and is ideal for professionals, creators, and students.",
        specs: {
            "Brand": "Apple",
            "Processor": "Apple M2",
            "RAM": "16 GB Unified Memory",
            "Storage": "256 GB SSD",
            "Storage Type": "SSD",
            "Operating System": "macOS Sequoia",
            "Display": "13.6 Inch",
            "Weight": "1.24 Kg",
            "Color": "Midnight",
            "In the Box": "13.6-inch MacBook Air, USB-C Power Adapter, USB-C to MagSafe 3 Cable (2 m)"
        },
    },
    {
        name: "Apple MacBook Air M4 - (16 GB/256 GB SSD/macOS Sequoia) MW123HN/A (13.6 Inch, Midnight, 1.24 Kg)",
        category: "Laptops",
        price: 93440,
        rating: 4.7,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/m/3/7/-original-imahayjpgztvrfyj.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/d/h/p/-original-imahayjpx8jhurrn.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/t/b/i/-original-imahayjpe2mwhugv.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/l/y/y/-original-imahayjpzcjbzgbt.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/l/4/p/-original-imahayjpceghtzhy.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/computer/l/x/6/-original-imahayjptaqszhfe.jpeg?q=90",
        ],
        description: "Apple MacBook Air powered by the advanced Apple M4 chip with 16GB Unified Memory and 256GB SSD storage. Featuring a stunning 13.6-inch display in Midnight color, this lightweight laptop delivers exceptional performance and efficiency. It runs on macOS Sequoia and is ideal for professionals, creators, and students who need powerful multitasking and seamless ecosystem integration.",
        specs: {
            "Brand": "Apple",
            "Processor": "Apple M4 Chip",
            "Cores": "10-Core CPU",
            "RAM": "16 GB Unified Memory",
            "Storage": "256 GB SSD",
            "Expandable SSD Capacity": "Up to 2 TB",
            "Storage Type": "SSD",
            "Operating System": "macOS Sequoia",
            "Display": "13.6 Inch",
            "Weight": "1.24 Kg",
            "Color": "Midnight",
            "In the Box": "13-inch MacBook Air, 30W USB-C Power Adapter, USB-C to MagSafe 3 Cable (2 m)"
        },
    },
    {
        name: "ASUS V400 AiO Series V440VAB-KWPC001WS All in One Desktop - (13th Gen Core i3/8 GB DDR5/512 GB SSD/Windows 11 Home/23.8 Inch) with MS Office (White, 6.9 Kg)",
        category: "Desktops",
        price: 51990,
        rating: 4.5,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/u/m/y/-original-imahctkwhkunapkm.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/u/p/9/-original-imahctkwp9kz8trh.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/d/1/w/-original-imahctkwegyqfk3f.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/r/o/q/-original-imahctkww7unqfmr.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/h/q/w/-original-imahctkvcujgewxs.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/1/r/y/-original-imahctkvvtmgg3aw.jpeg?q=90",
            "",
        ],
        description: "ASUS V400 AiO Series V440VAB-KWPC001WS All-in-One Desktop powered by 13th Gen Intel Core i3 1315U processor with 8GB DDR5 RAM and 512GB SSD storage. It features a large 23.8-inch display and comes with Windows 11 Home and Microsoft Office pre-installed. Designed for productivity and home use with a sleek white finish and built-in webcam.",
        specs: {
            "Brand": "ASUS",
            "Series": "V400 AiO Series",
            "Model": "V440VAB-KWPC001WS",
            "Processor Brand": "Intel",
            "Processor": "Core i3 13th Gen 1315U",
            "Clock Speed": "Up to 4.5 GHz",
            "Cache": "10 MB",
            "RAM": "8 GB DDR5",
            "Memory Speed": "5200 MHz",
            "Memory Slots": "2 x DDR5 SO-DIMM",
            "Expandable Memory": "Up to 32 GB",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Operating System": "Windows 11 Home",
            "Display": "23.8 Inch",
            "Webcam": "Built-in Webcam",
            "Weight": "6.9 Kg",
            "Color": "White"
        },
    },
    {
        name: "Lenovo IdeaCentre AIO Core i3 (8 GB DDR4/512 GB SSD/Windows 11 Home/24 Inch) with MS Office (Cloud Grey, 6 Kg)",
        category: "Desktops",
        price: 53030,
        rating: 4.8,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/m/3/s/27irh9-lenovo-original-imah2v7fkfhzhjbg.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/m/3/s/27irh9-lenovo-original-imah2v7fkfhzhjbg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/n/e/b/27irh9-lenovo-original-imah2v7fpf6eaxb4.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/e/9/s/27irh9-lenovo-original-imah2v7fhap7mu8p.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/q/r/x/27irh9-lenovo-original-imah2v7f8kgfe83n.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/g/f/n/27irh9-lenovo-original-imah2v7ffvrexwzr.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/allinone-desktop/b/l/e/-original-imahdprezdjxz7gz.jpeg?q=90"
        ],
        description: "Lenovo IdeaCentre All-in-One Desktop powered by Intel Core i3-1315U processor with 8GB DDR4 RAM and 512GB SSD storage. It features a large 24-inch display, Windows 11 Home, and Microsoft Office pre-installed. Designed for productivity and home use with a sleek Cloud Grey finish and built-in webcam.",
        specs: {
            "Brand": "Lenovo",
            "Series": "IdeaCentre AIO",
            "Processor Brand": "Intel",
            "Processor": "Core i3-1315U",
            "Clock Speed": "Up to 4.5 GHz",
            "Cache": "10 MB",
            "Chipset": "Intel SoC Platform",
            "RAM": "8 GB DDR4",
            "Memory Speed": "5200 MT/s",
            "Memory Slots": "1 x DDR5 Slot",
            "Expandable Memory": "Up to 32 GB",
            "Storage": "512 GB SSD",
            "Storage Type": "SSD",
            "Operating System": "Windows 11 Home",
            "Display": "24 Inch",
            "Webcam": "Built-in Webcam",
            "Weight": "6 Kg",
            "Color": "Cloud Grey"
        },
    },
    {
        name: "Frontech 2.4Ghz Wireless Keyboard and Mouse | 104 Keys | 1200 DPI | Adjustable Height (KB-0030) Combo Set (White)",
        category: "Accessories",
        price: 945,
        rating: 4.1,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/6/i/f/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fywvdk7v2d.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/6/i/f/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fywvdk7v2d.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/i/l/h/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fyjjfqtz5h.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/i/v/s/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fy9hgwpwfp.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/g/x/i/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fy6k7wqf3k.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/d/8/p/2-4ghz-wireless-keyboard-and-mouse-104-keys-1200-dpi-adjustable-original-imahe2fy23hpwkd5.jpeg?q=90"
        ],
        description: "Frontech 2.4GHz Wireless Keyboard and Mouse Combo featuring 104 keys and 1200 DPI mouse sensitivity. Designed for office and home use, it offers adjustable keyboard height and reliable USB plug-and-play connectivity. Compatible with Windows, Mac OS, Linux, and Chrome OS devices.",
        specs: {
            "Brand": "Frontech",
            "Model": "KB-0030",
            "Connectivity": "2.4 GHz Wireless",
            "Keyboard Keys": "104 Keys",
            "Mouse DPI": "1200 DPI",
            "Type": "Wireless Combo Set",
            "Color": "White",
            "Compatibility": "Windows 7/8/8.1/10, Mac OS, Linux/Ubuntu, Chrome OS",
            "Designed For": "Laptop, Desktop, Chromebook, MacBook, Gaming Console",
            "Usage": "Office, Home",
            "Plug & Play": "Yes (USB)",
            "Net Quantity": "2 (Keyboard + Mouse)"
        },
    },
    {
        name: "Ant Esports MK710 V2 Wired Gaming Keyboard and Mouse Combo Set (White)",
        category: "Accessories",
        price: 1160,
        rating: 4.3,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/s/n/u/-original-imahaksassduhpgs.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/s/n/u/-original-imahaksassduhpgs.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/q/o/q/-original-imahaksauhfwbnew.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/n/d/l/-original-imahaksagz6smvzt.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/c/s/q/-original-imahaksa7vxsawgy.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/n/x/h/-original-imahaksa3vgpqfhm.jpeg?q=90"
        ],
        description: "Ant Esports MK710 V2 Wired Gaming Combo featuring a gaming keyboard and mouse in a stylish white finish. Designed for gamers and professionals, it offers reliable wired connectivity and broad compatibility with PC, Laptop, PlayStation, Xbox, and Mac devices. Ideal for immersive gaming and everyday use.",
        specs: {
            "Brand": "Ant Esports",
            "Model": "MK710 V2",
            "Type": "Wired Gaming Combo",
            "Color": "White",
            "Connectivity": "Wired",
            "Suitable For": "PC, Laptop, PS3, PS4, PS5, Xbox, Mac",
            "In the Box": "1 Gaming Mouse, 1 Wired Gaming Keyboard, User Manual",
            "Net Quantity": "2 (Keyboard + Mouse)"
        },
    },
    {
        name: "Frontech Aero Blade Wired Gaming Keyboard and Optical Mouse | LED RGB Backlight KB-0044 Combo Set (Grey, White, Orange)",
        category: "Accessories",
        price: 1209,
        rating: 4.2,
        image: "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/d/z/j/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imah7e2tynf8swzv.jpeg?q=90",
        images: [
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/d/z/j/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imah7e2tynf8swzv.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/a/g/i/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imah7e2thmruygkg.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/n/k/t/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imah7e2tyrp5thaq.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/t/s/l/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imah7e2tw7tgh58p.jpeg?q=90",
            "https://rukminim2.flixcart.com/image/1424/1424/xif0q/laptop-accessories-combo/k/g/e/aero-blade-wired-gaming-keyboard-and-optical-mouse-led-rgb-original-imahd9h4ggx8wgp6.jpeg?q=90"
        ],
        description: "Frontech Aero Blade KB-0044 Wired Gaming Keyboard and Optical Mouse Combo featuring LED RGB backlighting. Designed for gamers and professionals, this combo offers responsive keys and precision optical tracking. Compatible with Windows systems and ideal for desktop and laptop gaming setups.",
        specs: {
            "Brand": "Frontech",
            "Model": "KB-0044",
            "Series": "Aero Blade",
            "Type": "Gaming Keyboard & Mouse Combo",
            "Connectivity": "Wired",
            "Backlight": "LED RGB",
            "Color Options": "Grey, White, Orange",
            "Compatibility": "Windows XP/2000/ME/Vista/7/8/10",
            "Designed For": "Laptop, Desktop, Chromebook, MacBook",
            "Suitable For": "Desktop, Laptop",
            "Net Quantity": "1 Combo Set"
        },
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');
        await Product.deleteMany({});
        console.log('Product collection cleared.');

        // Apply 70% discount to all products and mark as refurbished
        const discountedProducts = products.map(product => {
            let name = product.name;
            if (product.category === 'Laptops' && !name.includes('Refurbished')) {
                name = `Refurbished ${name}`;
            }
            return {
                ...product,
                name: name,
                oldPrice: product.price,
                price: Math.round(product.price * 0.3),
                badge: 'sale',
                description: product.category === 'Laptops' 
                    ? `[Premium Refurbished] ${product.description}`
                    : product.description
            };
        });

        await Product.insertMany(discountedProducts);
        console.log('Database seeded successfully with new products!');

        mongoose.connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();

import { json } from '@sveltejs/kit';
import xlsx from 'node-xlsx';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function camelize(str: string) {
    return str.replace(/_/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,
        function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        }
    );
}

interface Product {
    id: number;
    name: string;
    carbonFootprint: number;
    description: string;
    source: string;
}

export function GET() {
    const filePath = join(__dirname, '..', '..', '..', 'lib', 'data', 'product.xlsx');
    const workSheetsFromFile = xlsx.parse(readFileSync(filePath));
    
    const sheet = workSheetsFromFile[0];
    const [header, ...rows] = sheet.data;

    const products: Product[] = rows.map((row: any[]) => {
        const product: Partial<Product> = {};
        
        header.forEach((key: string, index: number) => {
            if (key) {
                const camelKey = camelize(key)
                const element = row[index]
                if (typeof element  == 'string' && camelize(key) === 'product') {
                    let elementSplit = element.split(' - ', 1)
                    product['name'] = elementSplit[0]
                    product['description'] = elementSplit[1] || ''
                } else {
                    product[camelKey as keyof Product] = element;
                }
            }
        });

        return product as Product;
    });

    return json(products);
}
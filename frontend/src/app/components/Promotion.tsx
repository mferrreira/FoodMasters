import { useEffect, useState } from "react";
import { CardProducts } from "./CardProducts";
import api from "@/services/api";

interface PromotionProps {
    title: string;
    type: 'promotion' | 'bestsellers'; // Diferenciar entre promoções e mais vendidos
    limit: number; // Adicionar um limite para o número de produtos exibidos
}

export function Promotion({ title, type, limit }: PromotionProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(limit); // Estado para controlar quantos produtos mostrar

    useEffect(() => {
        // Fazer requisição para API com base no tipo de produto (promoção ou mais vendidos)
        async function fetchProducts() {
            try {
                const response = await api.get(`/api/produtos/`); // Aqui você pode filtrar por type se necessário
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            }
        }

        fetchProducts();
    }, [type]);

    const handleShowMore = () => {
        setVisibleProducts(prev => prev + 3); // Aumentar a quantidade de produtos visíveis
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-5xl font-bold mb-14 text-center">{title}</h2>
            <div className="flex flex-wrap justify-center px-6 w-[925px]">
                {products.slice(0, visibleProducts).map((product: any) => (
                    <CardProducts 
                        key={product.codigo_barras}
                        codigo_barras={product.codigo_barras}
                        nome={product.nome}
                        preco={product.preco}
                        desconto={product.desconto}
                        imageUrl={product.imageUrl}
                        showAddToCart={true}
                    />
                ))}
            </div>
            {visibleProducts < products.length && ( // Mostrar o botão apenas se houver mais produtos
                <button 
                    className="h-14 w-52 rounded-[62px] border mt-9"
                    onClick={handleShowMore} // Adicionar a funcionalidade de mostrar mais
                >
                    Ver mais
                </button>
            )}
        </div>
    );
}

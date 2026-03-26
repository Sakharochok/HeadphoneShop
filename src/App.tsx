import { useState, useEffect } from 'react';
import { StoreFacade } from './core/patterns/structural/StoreFacade';
import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';
import { IObserver } from './core/patterns/behavioral/Observer';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';

const store = new StoreFacade();
const headphone1 = new HeadphoneProduct("Відлуння Pro", 1960, true);
const headphone2 = new HeadphoneProduct("Відлуння Bass", 2600, true);
const headphone3 = new DiscountDecorator(new HeadphoneProduct("Відлуння Lite", 900, false), 10);
store.initStore([headphone1, headphone2, headphone3]);

export default function App() {
    const [cartTotal, setCartTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        class ReactCartObserver implements IObserver {
            update(totalPrice: number, itemCount: number): void {
                setCartTotal(totalPrice);
                setCartCount(itemCount);
            }
        }
        const observer = new ReactCartObserver();
        store.subscribeToCart(observer);
        
        return () => {
            ShoppingCart.getInstance().removeObserver(observer);
        };
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h1 style={{ color: '#111' }}>🎧 Магазин навушників</h1>
                <div style={{ background: '#f0f0f0', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold' }}>
                    🛒 Кошик: {cartCount} шт. | {cartTotal} грн
                </div>
            </header>

            <main>
                <h2 style={{ marginBottom: '20px' }}>Найкращий вибір</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {store.getCatalog().getComponents().map((item, index) => (
                        <div key={index} style={{ background: 'white', border: '1px solid #eaeaea', padding: '20px', borderRadius: '16px', width: '250px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <div style={{ height: '150px', background: '#f8f8f8', borderRadius: '12px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>
                                🎧
                            </div>
                            <h3 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>{item.getName()}</h3>
                            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', margin: '0 0 15px 0' }}>{item.getPrice()} грн</p>
                            <button 
                                onClick={() => store.addToCart(item)}
                                style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold', transition: 'background 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#1d4ed8'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#2563eb'}
                            >
                                Додати в кошик
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
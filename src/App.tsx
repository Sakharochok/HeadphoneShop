import React, { useState, useEffect } from 'react';
import { Headphones, Search, Bell, Heart, ShoppingCart as CartIcon, ChevronDown, LayoutGrid, ThumbsUp, Percent, Star, X, Package, ShieldCheck, CreditCard, Undo2, Menu, ChevronRight, CheckCircle2, Trash2, ArrowLeft } from 'lucide-react';
import { StoreFacade } from './core/patterns/structural/StoreFacade';
import { HeadphoneProduct } from './core/models/HeadphoneProduct';
import { DiscountDecorator } from './core/patterns/structural/ProductDecorator';
import { ShoppingCart } from './core/patterns/creational/ShoppingCartSingleton';
import { IObserver } from './core/patterns/behavioral/Observer';
import { AddToCartCommand } from './core/patterns/behavioral/Command';
import { OrderBuilder } from './core/patterns/creational/OrderBuilder';
import { PriceAscendingStrategy, PriceDescendingStrategy } from './core/patterns/behavioral/SortStrategy';

const store = new StoreFacade();
const headphone1 = new HeadphoneProduct("Відлуння Pro", 1960, true);
const headphone2 = new HeadphoneProduct("Відлуння Bass", 2600, true);
const headphone3 = new DiscountDecorator(new HeadphoneProduct("Відлуння Lite", 900, false), 10);
const headphone4 = new HeadphoneProduct("Відлуння New", 2000, true);
store.initStore([headphone1, headphone2, headphone3, headphone4]);

const PRIMARY_COLOR = '#2563eb';
const BACKGROUND_COLOR = '#ffffff';
const TEXT_COLOR_BLACK = '#111';
const TEXT_COLOR_GREY = '#6b7280';
const BORDER_COLOR_LIGHT = '#e5e7eb';
const CARD_IMAGE_BG = '#f3f4f6';

const BANNER_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
const PRODUCT_IMAGE = "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80";

const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexShrink: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div style={{ background: PRIMARY_COLOR, width: '42px', height: '42px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Headphones size={22} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: TEXT_COLOR_BLACK }}>Магазин</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: TEXT_COLOR_BLACK }}>навушників</span>
        </div>
    </div>
);

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) => (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '800px', background: CARD_IMAGE_BG, borderRadius: '24px', padding: '0 20px', height: '44px', margin: '0 30px', minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: TEXT_COLOR_BLACK, fontWeight: 500, marginRight: '15px', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Усі категорії <ChevronDown size={16} color={TEXT_COLOR_GREY} />
        </div>
        <div style={{ width: '1px', height: '24px', background: '#d1d5db', marginRight: '15px' }}></div>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Шукати..." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: TEXT_COLOR_BLACK, minWidth: '50px' }} />
        <Search size={18} color={TEXT_COLOR_BLACK} style={{ cursor: 'pointer' }} />
    </div>
);

const UserActions = ({ itemCount, onCartClick, likedCount, onFavoritesClick }: { itemCount: number, onCartClick: () => void, likedCount: number, onFavoritesClick: () => void }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <Bell size={22} color={TEXT_COLOR_BLACK} style={{ cursor: 'pointer' }} onClick={() => alert("Немає нових сповіщень")} />
            
            <div onClick={onFavoritesClick} style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Heart size={22} color={TEXT_COLOR_BLACK} />
                {likedCount > 0 && <div style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#ef4444', color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>{likedCount}</div>}
            </div>

            <div onClick={onCartClick} style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <CartIcon size={22} color={TEXT_COLOR_BLACK} />
                {itemCount > 0 && <div style={{ position: 'absolute', top: '-6px', right: '-8px', background: PRIMARY_COLOR, color: 'white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>{itemCount}</div>}
            </div>
            <img src="https://ui-avatars.com/api/?name=US&background=eaeaea&color=333" alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
        </div>
    );
};

const Sidebar = ({ activeMenu, setActiveMenu }: { activeMenu: string, setActiveMenu: (m: string) => void }) => {
    const menuItems = [
        { icon: Headphones, label: 'Усі навушники' },
        { icon: ThumbsUp, label: 'Найкращий вибір' },
        { icon: Percent, label: 'Акції та знижки' },
        { icon: Star, label: 'Колекції' }
    ];

    return (
        <aside style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ color: TEXT_COLOR_BLACK, fontSize: '20px', fontWeight: 800, paddingLeft: '15px', marginBottom: '5px' }}>Меню</div>
            <div onClick={() => setActiveMenu('Усі навушники')} style={{ background: PRIMARY_COLOR, padding: '12px 18px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}><Menu size={18} /> Категорії</div>
                < ChevronRight size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {menuItems.map((item, i) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <div key={i} onClick={() => setActiveMenu(item.label)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 18px', borderRadius: '16px', color: isActive ? TEXT_COLOR_BLACK : TEXT_COLOR_GREY, fontWeight: isActive ? 700 : 500, cursor: 'pointer', transition: '0.2s', fontSize: '15px', background: isActive ? CARD_IMAGE_BG : 'transparent' }}>
                            <item.icon size={20} color={isActive ? TEXT_COLOR_BLACK : TEXT_COLOR_GREY} />
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

const Banner = () => {
    const scrollToCatalog = () => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div style={{ background: CARD_IMAGE_BG, borderRadius: '24px', minHeight: '320px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '40px' }}>
            <div style={{ flex: 1, zIndex: 2, maxWidth: '60%' }}>
                <div style={{ fontSize: '16px', color: TEXT_COLOR_BLACK, marginBottom: '10px' }}>Пориньте в</div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: TEXT_COLOR_BLACK, lineHeight: '1.1', marginBottom: '30px' }}>КРИСТАЛЬНО<br/>ЧИСТИЙ ЗВУК</div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: TEXT_COLOR_BLACK, fontWeight: 700, flexWrap: 'wrap' }}>
                    {[ {text: "Гарантія"}, {text: "Розстрочка"}, {text: "Доставка"} ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {i > 0 && <span style={{ color: TEXT_COLOR_GREY }}>*</span>}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ position: 'absolute', right: '0', top: '0', height: '100%', width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div onClick={scrollToCatalog} style={{ position: 'absolute', left: '-40px', background: 'white', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_COLOR_BLACK, fontWeight: 700, textAlign: 'center', fontSize: '12px', zIndex: 3, cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Придбати<br/>зараз
                </div>
                <img src={BANNER_IMAGE} alt="Main Headphones" style={{ height: '140%', width: '100%', objectFit: 'cover', mixBlendMode: 'multiply', transform: 'translateX(20px)' }} />
            </div>
        </div>
    );
};

const ProductCard = ({ item, onDetails }: { item: any, onDetails: () => void }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div onClick={onDetails} style={{ height: '240px', background: CARD_IMAGE_BG, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', cursor: 'pointer' }}>
            <img src={PRODUCT_IMAGE} alt="Headphone" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Розпродаж', item.getName().includes('Знижка') ? 'Знижка' : 'Кращий вибір'].map((badge, i) => <div key={i} style={{ border: `1px solid ${TEXT_COLOR_BLACK}`, color: TEXT_COLOR_BLACK, fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', background: 'transparent' }}>{badge}</div>)}
            </div>
        </div>
        <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: TEXT_COLOR_BLACK, margin: '5px 0 6px 0' }}>{item.getName()}</h3>
            <p style={{ fontSize: '18px', fontWeight: 800, color: TEXT_COLOR_BLACK, margin: '0 0 14px 0' }}>{item.getPrice()} грн</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span onClick={onDetails} style={{ fontSize: '13px', fontWeight: 600, color: TEXT_COLOR_GREY, cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = PRIMARY_COLOR} onMouseOut={e => e.currentTarget.style.color = TEXT_COLOR_GREY}>Докладніше</span>
                <button onClick={() => new AddToCartCommand(ShoppingCart.getInstance(), item).execute()} style={{ background: PRIMARY_COLOR, color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>У кошик</button>
            </div>
        </div>
    </div>
);

const ProductGrid = ({ products, sortType, onSort, onDetails, activeMenu, onResetAll }: { products: any[], sortType: string, onSort: (type: string) => void, onDetails: (item: any) => void, activeMenu: string, onResetAll: () => void }) => (
    <section id="catalog-section" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: TEXT_COLOR_BLACK, margin: 0 }}>{activeMenu}</h2>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <select value={sortType} onChange={(e) => onSort(e.target.value)} style={{ padding: '8px 14px', borderRadius: '16px', border: 'none', color: TEXT_COLOR_GREY, fontWeight: 500, fontSize: '14px', outline: 'none', cursor: 'pointer', appearance: 'none', background: `url("data:image/svg+xml;utf8,<svg fill='none' stroke='%236b7280' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'></path></svg>") no-repeat right 10px center / 16px`, paddingRight: '35px', backgroundBlendMode: 'multiply' }}>
                    <option value="">Без сортування</option>
                    <option value="asc">Спочатку дешеві</option>
                    <option value="desc">Спочатку дорогі</option>
                </select>
                <span onClick={onResetAll} style={{ color: TEXT_COLOR_GREY, cursor: 'pointer', fontSize: '14px', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = PRIMARY_COLOR} onMouseOut={e => e.currentTarget.style.color = TEXT_COLOR_GREY}>Дивитись усі</span>
            </div>
        </div>
        {products.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: TEXT_COLOR_GREY, fontSize: '16px', background: CARD_IMAGE_BG, borderRadius: '20px' }}>За вашим запитом нічого не знайдено</div>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
                {products.map((item, index) => <ProductCard key={index} item={item} onDetails={() => onDetails(item)} />)}
            </div>
        )}
    </section>
);

const ProductModal = ({ product, onClose, isLiked, toggleLike }: { product: any, onClose: () => void, isLiked: boolean, toggleLike: (item: any) => void }) => {
    if (!product) return null;
    return (
        <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '30px', width: '700px', maxWidth: '90%', display: 'flex', gap: '30px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
                <X onClick={onClose} size={24} color={TEXT_COLOR_BLACK} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} />
                <div style={{ flex: 1, background: CARD_IMAGE_BG, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', minHeight: '250px' }}>
                    <img src={PRODUCT_IMAGE} alt="Headphone" style={{ width: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 10px 0', color: TEXT_COLOR_BLACK }}>{product.getName()}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px', color: '#fbbf24' }}>
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#fbbf24" />)}
                        <span style={{ color: TEXT_COLOR_GREY, fontSize: '13px', marginLeft: '8px' }}>(124 відгуки)</span>
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: 800, color: PRIMARY_COLOR, margin: '0 0 20px 0' }}>{product.getPrice()} грн</p>
                    <p style={{ color: TEXT_COLOR_GREY, lineHeight: '1.5', marginBottom: '30px', fontSize: '14px' }}>Високоякісні бездротові навушники з активним шумозаглушенням. Забезпечують до 30 годин прослуховування на одному заряді.</p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => { new AddToCartCommand(ShoppingCart.getInstance(), product).execute(); onClose(); }} style={{ flex: 1, background: PRIMARY_COLOR, color: 'white', border: 'none', padding: '14px', borderRadius: '16px', cursor: 'pointer', fontWeight: 700, fontSize: '15px', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>Додати в кошик</button>
                        <button onClick={() => toggleLike(product)} style={{ width: '50px', background: CARD_IMAGE_BG, border: 'none', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }}>
                            <Heart size={22} color={isLiked ? "#ef4444" : TEXT_COLOR_BLACK} fill={isLiked ? "#ef4444" : "none"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartDrawer = ({ isOpen, onClose, cartData }: { isOpen: boolean, onClose: () => void, cartData: { totalPrice: number, itemCount: number, items: any[] } }) => {
    const [step, setStep] = useState<'cart' | 'checkout' | 'processing' | 'done'>('cart');
    const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
    const [formError, setFormError] = useState("");
    const [lastCommand, setLastCommand] = useState<AddToCartCommand | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('cart');
                setFormError("");
            }, 300);
            setFormData({ name: '', phone: '', address: '' });
        }
    }, [isOpen]);

    const handleUndo = () => { if (lastCommand) { lastCommand.undo(); setLastCommand(null); } };

    const submitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        const nameParts = formData.name.trim().split(/\s+/);
        if (nameParts.length < 2) {
            setFormError("Введіть ім'я та прізвище (через пробіл)");
            return;
        }

        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10 || phoneDigits.length > 13) {
            setFormError("Введіть коректний номер телефону");
            return;
        }

        if (formData.address.trim().length < 5) {
            setFormError("Введіть повну адресу доставки");
            return;
        }

        setStep('processing');
        
        const order = new OrderBuilder()
            .setCustomer(formData.name, formData.phone)
            .setDeliveryAddress(formData.address)
            .setItems([...cartData.items], cartData.totalPrice)
            .build();
            
        setTimeout(() => {
            order.pay();
            order.ship();
            
            const cart = ShoppingCart.getInstance();
            [...cart.getItems()].forEach(item => cart.removeItem(item));
            
            setStep('done');
        }, 1500);
    };

    return (
        <div style={{ position: 'fixed', top: 0, right: 0, width: isOpen ? '420px' : '0', height: '100vh', background: 'white', boxShadow: '-5px 0 30px rgba(0,0,0,0.1)', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {step === 'checkout' && <ArrowLeft onClick={() => setStep('cart')} size={24} color={TEXT_COLOR_BLACK} style={{ cursor: 'pointer' }} />}
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: TEXT_COLOR_BLACK, margin: 0 }}>
                        {step === 'cart' ? 'Кошик' : step === 'checkout' ? 'Оформлення' : 'Статус'}
                    </h2>
                </div>
                <X onClick={onClose} size={24} color={TEXT_COLOR_BLACK} style={{ cursor: 'pointer' }} />
            </div>

            {step === 'cart' && (
                <>
                    {cartData.items.length === 0 ? (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_COLOR_GREY, fontWeight: 500, fontSize: '15px' }}>Кошик порожній.</div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', padding: '0 25px', minHeight: 0 }}>
                            {cartData.items.map((item: any, i: number) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER_COLOR_LIGHT}`, paddingBottom: '12px' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: TEXT_COLOR_BLACK, flex: 1, paddingRight: '10px' }}>{item.getName()}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontSize: '16px', fontWeight: 800, color: PRIMARY_COLOR, whiteSpace: 'nowrap' }}>{item.getPrice()} грн</span>
                                        <button onClick={() => ShoppingCart.getInstance().removeItem(item)} style={{ background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex', color: '#ef4444' }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ borderTop: `1px solid ${BORDER_COLOR_LIGHT}`, padding: '20px 25px 25px 25px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: TEXT_COLOR_BLACK }}>
                            <span>Всього:</span>
                            <span>{cartData.totalPrice} <span style={{fontSize: '16px'}}>грн</span></span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleUndo} disabled={cartData.items.length === 0} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: `1px solid ${BORDER_COLOR_LIGHT}`, background: 'white', cursor: cartData.items.length === 0 ? 'not-allowed' : 'pointer', opacity: cartData.items.length === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontWeight: 600, color: TEXT_COLOR_BLACK, fontSize: '14px' }}>
                                <Undo2 size={16}/>Скасувати
                            </button>
                            <button onClick={() => setStep('checkout')} disabled={cartData.items.length === 0} style={{ flex: 1.5, padding: '14px', borderRadius: '14px', border: 'none', background: cartData.items.length === 0 ? '#93c5fd' : PRIMARY_COLOR, color: 'white', fontWeight: 700, cursor: cartData.items.length === 0 ? 'not-allowed' : 'pointer', fontSize: '14px' }}>
                                Оформити
                            </button>
                        </div>
                    </div>
                </>
            )}

            {step === 'checkout' && (
                <form onSubmit={submitOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 25px 25px 25px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: TEXT_COLOR_BLACK, marginBottom: '8px' }}>Прізвище та ім'я</label>
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Іван Іваненко" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1px solid ${BORDER_COLOR_LIGHT}`, background: CARD_IMAGE_BG, outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: TEXT_COLOR_BLACK, marginBottom: '8px' }}>Номер телефону</label>
                            <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="+38 (000) 000-00-00" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1px solid ${BORDER_COLOR_LIGHT}`, background: CARD_IMAGE_BG, outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: TEXT_COLOR_BLACK, marginBottom: '8px' }}>Адреса доставки</label>
                            <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} type="text" placeholder="м. Київ, Відділення НП №1" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1px solid ${BORDER_COLOR_LIGHT}`, background: CARD_IMAGE_BG, outline: 'none', fontSize: '14px', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ background: '#eff6ff', padding: '15px', borderRadius: '12px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: PRIMARY_COLOR }}>
                                <span>До сплати:</span>
                                <span>{cartData.totalPrice} грн</span>
                            </div>
                        </div>
                        {formError && <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>{formError}</div>}
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: PRIMARY_COLOR, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '15px', marginTop: '20px', flexShrink: 0 }}>
                        Підтвердити замовлення
                    </button>
                </form>
            )}

            {step === 'processing' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: `4px solid ${BORDER_COLOR_LIGHT}`, borderTopColor: PRIMARY_COLOR, borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: TEXT_COLOR_BLACK }}>Обробка замовлення...</h3>
                    <p style={{ color: TEXT_COLOR_GREY, margin: 0, fontSize: '14px' }}>Перевіряємо дані та підтверджуємо оплату.</p>
                </div>
            )}

            {step === 'done' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'white' }}>
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '22px', color: TEXT_COLOR_BLACK }}>Замовлення прийнято!</h3>
                    <p style={{ color: TEXT_COLOR_GREY, margin: '0 0 30px 0', fontSize: '14px', lineHeight: '1.5' }}>Дякуємо, {formData.name.split(' ')[0]}! Ваше замовлення успішно оформлено. Ми відправимо його за адресою: {formData.address}.</p>
                    <button onClick={onClose} style={{ width: '100%', padding: '14px', borderRadius: '14px', border: `1px solid ${BORDER_COLOR_LIGHT}`, background: 'white', color: TEXT_COLOR_BLACK, fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>Закрити</button>
                </div>
            )}
        </div>
    );
};

const FavoritesDrawer = ({ isOpen, onClose, likedItems, toggleLike }: { isOpen: boolean, onClose: () => void, likedItems: any[], toggleLike: (item: any) => void }) => (
    <div style={{ position: 'fixed', top: 0, right: 0, width: isOpen ? '400px' : '0', height: '100vh', background: 'white', boxShadow: '-5px 0 30px rgba(0,0,0,0.1)', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', flexShrink: 0 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: TEXT_COLOR_BLACK, margin: 0 }}>Улюблене</h2>
            <X onClick={onClose} size={24} color={TEXT_COLOR_BLACK} style={{ cursor: 'pointer' }} />
        </div>
        {likedItems.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_COLOR_GREY, fontWeight: 500, fontSize: '15px' }}>Немає улюблених товарів.</div>
        ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto', padding: '0 25px 25px 25px', minHeight: 0 }}>
                {likedItems.map((item: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BORDER_COLOR_LIGHT}`, paddingBottom: '12px' }}>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: 600, color: TEXT_COLOR_BLACK }}>{item.getName()}</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: PRIMARY_COLOR, marginTop: '4px' }}>{item.getPrice()} грн</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => new AddToCartCommand(ShoppingCart.getInstance(), item).execute()} style={{ background: PRIMARY_COLOR, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '12px' }}>У кошик</button>
                            <button onClick={() => toggleLike(item)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default function App() {
    const [cartData, setCartData] = useState<{ totalPrice: number, itemCount: number, items: any[] }>({ totalPrice: 0, itemCount: 0, items: [] });
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [likedItems, setLikedItems] = useState<any[]>([]);
    const [isFavOpen, setIsFavOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [activeMenu, setActiveMenu] = useState('Усі навушники');
    const [sortType, setSortType] = useState("");
    const [modalProduct, setModalProduct] = useState<any | null>(null);
    const [renderTrigger, setRenderTrigger] = useState(0);

    useEffect(() => {
        class ReactCartObserver implements IObserver {
            update(data: { totalPrice: number, itemCount: number, items: any[] }): void { setCartData(data); }
        }
        const observer = new ReactCartObserver();
        store.subscribeToCart(observer);
        return () => ShoppingCart.getInstance().removeObserver(observer);
    }, []);

    const toggleLike = (product: any) => {
        if (likedItems.some(item => item.getName() === product.getName())) {
            setLikedItems(likedItems.filter(item => item.getName() !== product.getName()));
        } else {
            setLikedItems([...likedItems, product]);
        }
    };

    const handleSort = (type: string) => {
        setSortType(type);
        if (type === 'asc') store.applySorting(new PriceAscendingStrategy());
        else if (type === 'desc') store.applySorting(new PriceDescendingStrategy());
        setRenderTrigger(prev => prev + 1);
    };

    const handleResetAll = () => {
        setActiveMenu('Усі навушники');
        setSearchQuery("");
        handleSort("");
    };

    let displayedProducts = [...store.getCatalog().getComponents()];

    if (activeMenu === 'Акції та знижки') {
        displayedProducts = displayedProducts.filter(p => p.getName().includes('Знижка'));
    } else if (activeMenu === 'Колекції') {
        displayedProducts = displayedProducts.filter(p => p.getName().includes('Pro') || p.getName().includes('New'));
    } else if (activeMenu === 'Найкращий вибір') {
        displayedProducts = displayedProducts.filter(p => p.getPrice() > 1000);
    }

    if (searchQuery) {
        displayedProducts = displayedProducts.filter(p => p.getName().toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortType === 'asc') displayedProducts.sort((a, b) => a.getPrice() - b.getPrice());
    if (sortType === 'desc') displayedProducts.sort((a, b) => b.getPrice() - a.getPrice());

    return (
        <div style={{ background: BACKGROUND_COLOR, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <header style={{ padding: '15px 40px', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: `1px solid ${BORDER_COLOR_LIGHT}`, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Logo />
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <UserActions itemCount={cartData.itemCount} onCartClick={() => setIsCartOpen(true)} likedCount={likedItems.length} onFavoritesClick={() => setIsFavOpen(true)} />
                </div>
            </header>
            
            <div style={{ width: '100%', padding: '30px 40px 80px 40px', boxSizing: 'border-box', display: 'flex', gap: '40px' }}>
                <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
                <main style={{ flex: 1, minWidth: 0, paddingBottom: '60px' }}>
                    <Banner />
                    <ProductGrid products={displayedProducts} sortType={sortType} onSort={handleSort} onDetails={setModalProduct} activeMenu={activeMenu} onResetAll={handleResetAll} />
                </main>
            </div>
            
            <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} isLiked={modalProduct ? likedItems.some(i => i.getName() === modalProduct.getName()) : false} toggleLike={toggleLike} />
            
            {(isCartOpen || isFavOpen) && <div onClick={() => { setIsCartOpen(false); setIsFavOpen(false); }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 999 }}></div>}
            
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartData={cartData} />
            <FavoritesDrawer isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} likedItems={likedItems} toggleLike={toggleLike} />
        </div>
    );
}
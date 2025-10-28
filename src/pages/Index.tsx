import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  seller: string;
  sellerRating: number;
  rating: number;
  reviews: number;
  image: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro 256GB Titanium',
    price: 89990,
    category: 'Электроника',
    seller: 'TechStore',
    sellerRating: 4.9,
    rating: 4.8,
    reviews: 347,
    image: '📱'
  },
  {
    id: 2,
    name: 'Nike Air Max 2024 | Размер 42',
    price: 12990,
    category: 'Одежда и обувь',
    seller: 'SneakerHub',
    sellerRating: 4.8,
    rating: 4.9,
    reviews: 215,
    image: '👟'
  },
  {
    id: 3,
    name: 'MacBook Pro 14" M3 | 16GB RAM',
    price: 189990,
    category: 'Электроника',
    seller: 'AppleShop',
    sellerRating: 5.0,
    rating: 5.0,
    reviews: 428,
    image: '💻'
  },
  {
    id: 4,
    name: 'Cuisinart Мультиварка 6L',
    price: 8990,
    category: 'Дом и быт',
    seller: 'HomeMarket',
    sellerRating: 4.7,
    rating: 4.6,
    reviews: 189,
    image: '🍳'
  },
  {
    id: 5,
    name: 'Sony PlayStation 5 + 2 игры',
    price: 54990,
    category: 'Игры',
    seller: 'GameWorld',
    sellerRating: 4.9,
    rating: 4.8,
    reviews: 532,
    image: '🎮'
  },
  {
    id: 6,
    name: 'Samsung 55" QLED 4K Smart TV',
    price: 67990,
    category: 'Электроника',
    seller: 'TechStore',
    sellerRating: 4.9,
    rating: 4.7,
    reviews: 298,
    image: '📺'
  },
  {
    id: 7,
    name: 'Диван-кровать «Скандинавия» серый',
    price: 35990,
    category: 'Мебель',
    seller: 'FurnitureMax',
    sellerRating: 4.6,
    rating: 4.5,
    reviews: 124,
    image: '🛋️'
  },
  {
    id: 8,
    name: 'Набор посуды Tefal 12 предметов',
    price: 6990,
    category: 'Дом и быт',
    seller: 'HomeMarket',
    sellerRating: 4.7,
    rating: 4.8,
    reviews: 267,
    image: '🍽️'
  },
  {
    id: 9,
    name: 'Canon EOS R6 Mark II Body',
    price: 179990,
    category: 'Фототехника',
    seller: 'PhotoPro',
    sellerRating: 5.0,
    rating: 5.0,
    reviews: 156,
    image: '📷'
  },
  {
    id: 10,
    name: 'Xiaomi Robot Vacuum S10+',
    price: 24990,
    category: 'Дом и быт',
    seller: 'SmartHome',
    sellerRating: 4.8,
    rating: 4.7,
    reviews: 389,
    image: '🤖'
  },
  {
    id: 11,
    name: 'Кожаная куртка Zara | M',
    price: 15990,
    category: 'Одежда и обувь',
    seller: 'FashionStore',
    sellerRating: 4.6,
    rating: 4.5,
    reviews: 143,
    image: '🧥'
  },
  {
    id: 12,
    name: 'Настольная игра «Каркассон»',
    price: 2490,
    category: 'Игры',
    seller: 'BoardGames',
    sellerRating: 4.9,
    rating: 4.9,
    reviews: 567,
    image: '🎲'
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Александр М.',
    rating: 5,
    date: '15 октября 2024',
    text: 'Купил MacBook - отличное состояние, всё работает идеально. Доставка быстрая, продавец отзывчивый!',
    avatar: 'АМ'
  },
  {
    id: 2,
    author: 'Мария К.',
    rating: 5,
    date: '12 октября 2024',
    text: 'Заказала кроссовки Nike - пришли быстро, качество превосходное. Очень довольна покупкой!',
    avatar: 'МК'
  },
  {
    id: 3,
    author: 'Дмитрий В.',
    rating: 4,
    date: '8 октября 2024',
    text: 'PlayStation 5 пришла в отличной упаковке. Немного задержали доставку, но всё решилось хорошо.',
    avatar: 'ДВ'
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name={star <= Math.round(rating) ? 'Star' : 'Star'}
          size={16}
          className={star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (productId: number) => {
    if (!cartItems.includes(productId)) {
      setCartItems([...cartItems, productId]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(id => id !== productId));
  };

  const cartProducts = products.filter(p => cartItems.includes(p.id));
  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price, 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary">CodShop</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('home')}>Главная</Button>
              <Button variant="ghost" onClick={() => setActiveTab('catalog')}>Каталог</Button>
              <Button variant="ghost" onClick={() => setActiveTab('sellers')}>Продавцам</Button>
              <Button variant="ghost" onClick={() => setActiveTab('support')}>Поддержка</Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cartProducts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cartProducts.map(product => (
                        <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="text-3xl">{product.image}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-sm font-bold text-primary">{product.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={() => setShowPayment(true)}>
                          Перейти к оплате
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline" onClick={() => setActiveTab('profile')}>
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <section className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Маркетплейс разнообразных товаров</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Электроника, одежда, мебель, техника и многое другое в одном месте
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" onClick={() => setActiveTab('catalog')}>
                  <Icon name="Search" size={20} className="mr-2" />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('sellers')}>
                  <Icon name="Store" size={20} className="mr-2" />
                  Стать продавцом
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные товары</h3>
                <Button variant="link" onClick={() => setActiveTab('catalog')}>
                  Смотреть всё <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-5xl">{product.image}</div>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="Store" size={14} />
                        {product.seller}
                        <div className="flex items-center gap-1 ml-auto">
                          <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.sellerRating}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-2">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews} отзывов)
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product.id)}
                        disabled={cartItems.includes(product.id)}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        {cartItems.includes(product.id) ? 'В корзине' : 'В корзину'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">Отзывы покупателей</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map(review => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="electronics">Электроника</TabsTrigger>
                  <TabsTrigger value="fashion">Одежда</TabsTrigger>
                  <TabsTrigger value="home">Дом и быт</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-5xl">{product.image}</div>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Store" size={14} />
                      {product.seller}
                      <div className="flex items-center gap-1 ml-auto">
                        <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.sellerRating}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-2">
                      <StarRating rating={product.rating} />
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} отзывов)
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product.id)}
                      disabled={cartItems.includes(product.id)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      {cartItems.includes(product.id) ? 'В корзине' : 'В корзину'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Станьте продавцом на CodShop</h2>
              <p className="text-lg text-muted-foreground">
                Начните продавать свои аккаунты и товары тысячам покупателей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="text-3xl mb-2">🚀</div>
                  <CardTitle>Быстрый старт</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Начните продавать за 5 минут. Простая регистрация и интуитивный интерфейс.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-3xl mb-2">💰</div>
                  <CardTitle>Низкая комиссия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Всего 5% с продажи. Без скрытых платежей и дополнительных сборов.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-3xl mb-2">🔒</div>
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Защита сделок, гарантия выплат и поддержка в спорных ситуациях.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Требования к продавцам</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Честность и прозрачность</p>
                    <p className="text-sm text-muted-foreground">Предоставляйте только правдивую информацию о товарах</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Быстрая обработка заказов</p>
                    <p className="text-sm text-muted-foreground">Отвечайте на запросы в течение 24 часов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Качество товаров</p>
                    <p className="text-sm text-muted-foreground">Все аккаунты должны соответствовать описанию</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Зарегистрироваться как продавец
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Поддержка</h2>
              <p className="text-lg text-muted-foreground">
                Мы всегда готовы помочь вам
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Icon name="MessageCircle" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Онлайн-чат</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение 5 минут</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Email: support@codshop.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение 24 часов</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Icon name="Phone" size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Телефон: +7 (800) 555-35-35</p>
                    <p className="text-sm text-muted-foreground">Пн-Пт, 9:00 - 18:00 МСК</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-1">Как происходит оплата?</p>
                  <p className="text-sm text-muted-foreground">
                    Мы принимаем банковские карты, электронные кошельки и переводы. Все платежи защищены.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Есть ли гарантия на товары?</p>
                  <p className="text-sm text-muted-foreground">
                    Да, все товары имеют гарантию. Если товар не соответствует описанию, мы вернём деньги.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Сколько времени занимает доставка?</p>
                  <p className="text-sm text-muted-foreground">
                    Цифровые товары доставляются моментально после оплаты. Аккаунты - в течение 1-24 часов.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4 mb-8">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="text-2xl">ИП</AvatarFallback>
              </Avatar>
              <h2 className="text-3xl font-bold">Личный кабинет</h2>
            </div>

            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Мои покупки</TabsTrigger>
                <TabsTrigger value="sales">Мои продажи</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>История покупок</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      У вас пока нет покупок
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="sales" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Мои товары</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      Вы ещё не добавили товары на продажу
                    </p>
                    <Button className="w-full mt-4">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить товар
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки профиля</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Телефон</label>
                      <Input placeholder="+7 (___) ___-__-__" />
                    </div>
                    <Button>Сохранить изменения</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
            <DialogDescription>
              Заполните данные для оплаты вашего заказа
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Состав заказа:</h3>
              <div className="space-y-2">
                {cartProducts.map(product => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="truncate mr-4">{product.name}</span>
                    <span className="font-medium whitespace-nowrap">{product.price} ₽</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-primary">{totalPrice} ₽</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Способ оплаты</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">Банковская карта</p>
                      <p className="text-sm text-muted-foreground">Visa, MasterCard, Mir</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="Smartphone" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">СБП (Система быстрых платежей)</p>
                      <p className="text-sm text-muted-foreground">Оплата через банк по номеру телефона</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                  <RadioGroupItem value="yoomoney" id="yoomoney" />
                  <Label htmlFor="yoomoney" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    <div>
                      <p className="font-medium">ЮMoney</p>
                      <p className="text-sm text-muted-foreground">Электронный кошелёк</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold">Данные карты</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry">Срок действия</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        placeholder="123"
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardHolder">Имя держателя карты</Label>
                    <Input
                      id="cardHolder"
                      placeholder="IVAN IVANOV"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'sbp' && (
              <div className="space-y-4 border-t pt-4">
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Инструкция по оплате:</p>
                      <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
                        <li>Откройте приложение вашего банка</li>
                        <li>Выберите &quot;Оплата по QR-коду&quot; или &quot;СБП&quot;</li>
                        <li>Отсканируйте QR-код на следующем экране</li>
                        <li>Подтвердите оплату в приложении банка</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'yoomoney' && (
              <div className="space-y-4 border-t pt-4">
                <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div className="text-sm text-purple-900 dark:text-purple-100">
                      <p className="font-medium mb-1">После нажатия кнопки &quot;Оплатить&quot;:</p>
                      <p>Вы будете перенаправлены на страницу ЮMoney для завершения платежа</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setShowPayment(false)} className="w-full sm:w-auto">
              Отмена
            </Button>
            <Button 
              onClick={() => {
                setOrderSuccess(true);
                setShowPayment(false);
                setCartItems([]);
              }}
              className="w-full sm:w-auto"
              size="lg"
            >
              <Icon name="Lock" size={18} className="mr-2" />
              Оплатить {totalPrice} ₽
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Icon name="Check" size={32} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Заказ успешно оплачен!</DialogTitle>
            <DialogDescription className="text-center">
              Ваш заказ принят в обработку. Информация о покупке отправлена на вашу почту.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Номер заказа:</span>
                <span className="font-mono font-medium">#ORD-{Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Дата:</span>
                <span className="font-medium">{new Date().toLocaleDateString('ru-RU')}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Сумма:</span>
                <span className="text-primary">{totalPrice} ₽</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setOrderSuccess(false);
              setActiveTab('profile');
            }} className="w-full">
              Перейти в профиль
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-16">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CodShop</h3>
              <p className="text-sm text-muted-foreground">
                Безопасный маркетплейс разнообразных товаров
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как купить</li>
                <li>Гарантии</li>
                <li>Оплата и доставка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как продать</li>
                <li>Тарифы</li>
                <li>Правила</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Контакты</li>
                <li>FAQ</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2024 CodShop. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
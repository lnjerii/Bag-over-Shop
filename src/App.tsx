import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check,
  ChevronDown, Gem, Heart, Instagram, Menu, MessageCircle, Minus, Plus,
  RotateCcw, ShoppingBag, Sparkles, Tag, Truck, X,
} from 'lucide-react'
import {
  categories, formatKes, heroImage, instagramPhotos, products, storyImage, whatsappNumber,
  type Category, type Product,
} from './data/store'

type CartLine = { productId: string; quantity: number }
type Testimonial = { quote: string; name: string; location: string; stars: number }

const testimonials: Testimonial[] = [
  { quote: 'My tote has become the bag I reach for every single day. Beautiful quality, and the little details feel so considered.', name: 'Wanjiku M.', location: 'Nairobi', stars: 5 },
  { quote: 'The perfect crossbody for running around town. Ordering on WhatsApp was simple and I had such a lovely experience.', name: 'Amina K.', location: 'Mombasa', stars: 5 },
  { quote: 'I bought the Weekender for a short trip and it fit everything. It looks even better in person.', name: 'Njeri W.', location: 'Nakuru', stars: 5 },
]

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isCartLine(value: unknown): value is CartLine {
  return typeof value === 'object'
    && value !== null
    && 'productId' in value
    && typeof value.productId === 'string'
    && products.some((product) => product.id === value.productId)
    && 'quantity' in value
    && typeof value.quantity === 'number'
    && Number.isSafeInteger(value.quantity)
    && value.quantity > 0
}

function restoreCart(): CartLine[] {
  try {
    const saved = localStorage.getItem('bag-over-shop-cart')
    if (!saved) return []
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) throw new TypeError('Saved cart must be an array.')
    const validLines = parsed.filter(isCartLine)
    if (validLines.length !== parsed.length) {
      console.warn('Some invalid items in the saved cart were ignored.')
    }
    return validLines
  } catch (error) {
    console.error('Unable to restore the saved cart.', error)
    return []
  }
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartLine[]>(() => restoreCart())
  const [wishlisted, setWishlisted] = useState<string[]>([])
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [sortOrder, setSortOrder] = useState('featured')
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [quickQuantity, setQuickQuantity] = useState(1)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('bag-over-shop-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Unable to save the cart in this browser.', error)
    }
  }, [cart])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setShowTop(window.scrollY > 520)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false)
        setQuickView(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const visibleProducts = useMemo(() => {
    const filtered = category === 'All' ? [...products] : products.filter((item) => item.category === category)
    if (sortOrder === 'low') return filtered.sort((a, b) => a.price - b.price)
    if (sortOrder === 'high') return filtered.sort((a, b) => b.price - a.price)
    return filtered
  }, [category, sortOrder])

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0)
  const cartTotal = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId)
    return sum + (product?.price ?? 0) * line.quantity
  }, 0)

  const addToCart = (productId: string, quantity = 1) => {
    setCart((current) => {
      const found = current.find((line) => line.productId === productId)
      return found
        ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { productId, quantity }]
    })
  }

  const updateQuantity = (productId: string, amount: number) => {
    setCart((current) => current
      .map((line) => line.productId === productId ? { ...line, quantity: line.quantity + amount } : line)
      .filter((line) => line.quantity > 0))
  }

  const removeFromCart = (productId: string) =>
    setCart((current) => current.filter((line) => line.productId !== productId))

  const checkout = () => {
    if (!cart.length) return
    const summary = cart.map((line) => {
      const product = products.find((item) => item.id === line.productId)!
      return `• ${product.name} × ${line.quantity} — ${formatKes(product.price * line.quantity)}`
    }).join('\n')
    openWhatsApp(`Hello Bag Over Shop! I'd like to place an order:\n\n${summary}\n\nTotal: ${formatKes(cartTotal)}\n\nPlease let me know the next steps and payment options.`)
  }

  const toggleWishlist = (productId: string) => {
    setWishlisted((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get('email')
    if (typeof email === 'string' && email.trim()) {
      setNewsletterMessage('Thanks for stopping by! This demo does not send or save email addresses yet.')
      form.reset()
    }
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    if (!name || !message) return
    setContactMessage('Opening WhatsApp with your message. Your details are only shared if you choose to send it there.')
    openWhatsApp(`Hello Bag Over Shop, my name is ${name}.\n\n${message}`)
    event.currentTarget.reset()
  }

  const navLinks = [
    { label: 'Shop', href: '#shop' },
    { label: 'Our story', href: '#about' },
    { label: 'Journal', href: '#community' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <div className="announcement">
        <span>Thoughtful finds, made for your everyday</span>
        <span className="announcement-separator">·</span>
        <button onClick={() => scrollTo('shop')}>Find your new favourite <ArrowRight size={12} /></button>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Bag Over Shop home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><ShoppingBag size={19} strokeWidth={1.4} /></span>
            <span>BAG OVER <b>SHOP</b></span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
            <button className="nav-mobile-cart" onClick={() => { setCartOpen(true); setMenuOpen(false) }}>
              <ShoppingBag size={17} /> Your bag ({cartCount})
            </button>
          </nav>
          <div className="header-actions">
            <button className="icon-button bag-trigger" aria-label={`Open shopping bag, ${cartCount} items`} onClick={() => setCartOpen(true)}>
              <ShoppingBag size={19} strokeWidth={1.5} />
              <span className="bag-count">{cartCount}</span>
            </button>
            <button className="icon-button menu-trigger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <img className="hero-image" src={heroImage} alt="A well-made travel bag ready to go wherever the day takes you" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow light-eyebrow"><span /> THE EVERYDAY, ELEVATED</p>
            <h1>Carry what<br />moves <em>you.</em></h1>
            <p className="hero-description">Considered bags for big days, slow mornings, and every little adventure in between.</p>
            <button className="button button-light" onClick={() => scrollTo('shop')}>Shop Now <ArrowDownRight size={17} /></button>
          </div>
          <div className="hero-caption"><span>01 — 06</span><span>Made for the way you move</span></div>
          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div>
        </section>

        <section className="category-section section-pad" id="categories">
          <div className="section-heading category-heading">
            <div>
              <p className="eyebrow">A PLACE FOR EVERYTHING</p>
              <h2>Find your <em>kind</em> of carry.</h2>
            </div>
            <p className="section-aside">Little details. Lasting favourites.<br />A bag for every version of you.</p>
          </div>
          <div className="category-grid">
            {categories.map((item, index) => (
              <button
                className={`category-card category-card-${index + 1}`}
                key={item.name}
                onClick={() => { setCategory(item.name); scrollTo('shop') }}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="category-overlay" />
                <span className="category-content"><small>{item.note}</small><strong>{item.name}</strong></span>
                <span className="category-arrow"><ArrowUpRight size={17} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading shop-heading">
            <div>
              <p className="eyebrow">GOOD THINGS, GATHERED</p>
              <h2>Meet your <em>next</em> favourite.</h2>
            </div>
            <p className="section-aside">A thoughtful edit of bags to go wherever<br className="desktop-only" /> life takes you.</p>
          </div>
          <div className="shop-controls">
            <div className="filter-chips" aria-label="Filter products by category">
              {(['All', ...categories.map((item) => item.name)] as (Category | 'All')[]).map((item) => (
                <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort products by price">
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <button className="product-image-button" onClick={() => { setQuickView(product); setQuickQuantity(1) }} aria-label={`View ${product.name}`}>
                    <img src={product.image} alt={product.alt} loading="lazy" />
                  </button>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <button
                    className={`wishlist-button ${wishlisted.includes(product.id) ? 'wishlisted' : ''}`}
                    aria-label={wishlisted.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    onClick={() => toggleWishlist(product.id)}
                  ><Heart size={17} fill={wishlisted.includes(product.id) ? 'currentColor' : 'none'} /></button>
                  <button className="quick-view-button" onClick={() => { setQuickView(product); setQuickQuantity(1) }}>Quick view <ArrowUpRight size={14} /></button>
                </div>
                <div className="product-meta"><span>{product.category}</span><span>{product.colors.length} colours</span></div>
                <div className="product-title-row"><h3>{product.name}</h3><span>{formatKes(product.price)}</span></div>
                <button className="add-link" onClick={() => addToCart(product.id)}>Add to Cart <Plus size={15} /></button>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty-products">Nothing in this edit just yet.</p>}
          <p className="catalog-note">A small, considered collection — always being refreshed.</p>
        </section>

        <section className="story-section" id="about">
          <div className="story-photo">
            <img src={storyImage} alt="A travel bag packed for a change of scenery" loading="lazy" />
            <span className="photo-note"><Sparkles size={14} /> Thoughtfully chosen</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A LITTLE MORE INTENTION</p>
            <h2>Good things<br />go <em>with you.</em></h2>
            <p>We believe the right bag makes the everyday feel a little more like your own. So we gather pieces that are useful, lovely to live with, and ready for wherever your days lead.</p>
            <p>Not more stuff. Just the good stuff — thoughtfully found, and chosen to come along.</p>
            <a href="#community" className="text-link">A note from our little shop <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="benefits-section section-pad">
          <div className="benefit-item"><span className="benefit-icon"><Gem size={20} strokeWidth={1.4} /></span><div><h3>Quality materials</h3><p>Thoughtfully chosen bags with materials selected for everyday use.</p></div></div>
          <div className="benefit-item"><span className="benefit-icon"><Tag size={20} strokeWidth={1.4} /></span><div><h3>Affordable prices</h3><p>Everyday favourites with clear prices in KES.</p></div></div>
          <div className="benefit-item"><span className="benefit-icon"><Truck size={20} strokeWidth={1.4} /></span><div><h3>Fast delivery</h3><p>We’ll confirm delivery timing and options with you on WhatsApp.</p></div></div>
          <div className="benefit-item"><span className="benefit-icon"><RotateCcw size={20} strokeWidth={1.4} /></span><div><h3>Easy returns</h3><p>Ask us about current return options before placing your order.</p></div></div>
        </section>

        <section className="testimonial-section" aria-label="Customer reviews">
          <div className="testimonial-mark">“</div>
          <p className="eyebrow">KIND WORDS, FROM YOU</p>
          <div className="stars" aria-label={`${testimonials[testimonialIndex].stars} out of 5 stars`}>{'★'.repeat(testimonials[testimonialIndex].stars)}</div>
          <blockquote>{testimonials[testimonialIndex].quote}</blockquote>
          <p className="review-author">{testimonials[testimonialIndex].name} <span>— {testimonials[testimonialIndex].location}</span></p>
          <div className="review-controls">
            <button aria-label="Previous review" onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}><ArrowLeft size={17} /></button>
            <span>0{testimonialIndex + 1} <i>/</i> 0{testimonials.length}</span>
            <button aria-label="Next review" onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}><ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="community-section section-pad" id="community">
          <div className="section-heading community-heading">
            <div><p className="eyebrow">LIFE, WITH A LITTLE MORE ROOM</p><h2>Out there, <em>with you.</em></h2></div>
            <a className="text-link instagram-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow along <ArrowUpRight size={15} /></a>
          </div>
          <div className="instagram-grid">
            {instagramPhotos.map((photo, index) => (
              <a key={photo.alt} className="instagram-tile" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label={`Open Instagram, photo ${index + 1}`}>
                <img src={photo.image} alt={photo.alt} loading="lazy" />
                <span><Instagram size={19} /></span>
              </a>
            ))}
          </div>
          <p className="instagram-caption">A little inspiration from our everyday <span>— @bagovershop</span></p>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-decoration">B.</div>
          <p className="eyebrow">A NOTE FROM US, NOW AND THEN</p>
          <h2>Good things in your <em>inbox.</em></h2>
          <p>New finds, little stories, and the occasional reason to treat yourself.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Submit email"><ArrowRight size={18} /></button>
          </form>
          {newsletterMessage
            ? <p className="form-feedback" role="status"><Check size={14} /> {newsletterMessage}</p>
            : <p className="newsletter-note">Just a demo for now — your email won’t be saved or sent.</p>}
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">LET’S TALK BAGS</p>
            <h2>Here when<br />you <em>need us.</em></h2>
            <p>Need a hand choosing, checking availability, or figuring out delivery? We’re an online-only little shop, and we’d love to hear from you.</p>
            <a className="contact-whatsapp" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat with us on WhatsApp <ArrowUpRight size={15} /></a>
            <p className="contact-hours">Message us for current availability and delivery options.</p>
          </div>
          <form className="contact-form" onSubmit={handleContact}>
            <p className="eyebrow">SEND A LITTLE NOTE</p>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="How should we call you?" required />
            <label htmlFor="contact-message">What’s on your mind?</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="Tell us what you’re looking for..." required />
            <button className="button button-dark" type="submit">Continue to WhatsApp <ArrowUpRight size={16} /></button>
            {contactMessage && <p className="form-feedback contact-feedback" role="status">{contactMessage}</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#home"><span className="brand-mark"><ShoppingBag size={19} strokeWidth={1.4} /></span><span>BAG OVER <b>SHOP</b></span></a>
            <p>Everyday bags for wherever life takes you.</p>
            <a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Bag Over Shop on Instagram"><Instagram size={17} /></a>
          </div>
          <div className="footer-column"><p className="footer-title">EXPLORE</p><a href="#shop">Shop all</a><a href="#categories">Bag categories</a><a href="#about">Our story</a><a href="#community">The community</a></div>
          <div className="footer-column"><p className="footer-title">HERE TO HELP</p><a href="#contact">Get in touch</a><a href="#contact">Delivery questions</a><a href="#contact">Order on WhatsApp</a><span>Online-only shop</span></div>
          <div className="footer-column payment-column"><p className="footer-title">PAYMENT, YOUR WAY</p><p>Payment is coordinated directly during order confirmation.</p><div className="payment-tags"><span>M-Pesa</span><span>Card</span></div><p className="payment-small">No payment details are collected on this site.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Bag Over Shop. Made for everyday.</span><a href="#home">Back to the top ↑</a><span>Thoughtfully found, just for you.</span></div>
      </footer>

      {showTop && <button className="back-to-top" onClick={() => scrollTo('home')} aria-label="Back to top"><ArrowDown className="back-top-arrow" size={17} /></button>}

      {cartOpen && (
        <div className="overlay-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-heading"><div><p className="eyebrow">YOUR LITTLE COLLECTION</p><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button className="close-button" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}><X size={21} /></button></div>
            {cart.length === 0 ? (
              <div className="empty-cart"><span><ShoppingBag size={27} strokeWidth={1.3} /></span><h3>It’s a little empty in here.</h3><p>Maybe your next everyday favourite is waiting.</p><button className="button button-dark" onClick={() => { setCartOpen(false); scrollTo('shop') }}>Find a bag <ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="cart-lines">
                  {cart.map((line) => {
                    const product = products.find((item) => item.id === line.productId)!
                    return <div className="cart-line" key={line.productId}>
                      <img src={product.image} alt={product.alt} />
                      <div className="cart-line-info"><span>{product.category}</span><h3>{product.name}</h3><strong>{formatKes(product.price)}</strong>
                        <div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, -1)}><Minus size={13} /></button><span>{line.quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, 1)}><Plus size={13} /></button></div>
                      </div>
                      <button className="remove-line" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.id)}><X size={16} /></button>
                    </div>
                  })}
                </div>
                <div className="cart-summary"><div className="subtotal-row"><span>Subtotal</span><strong>{formatKes(cartTotal)}</strong></div><p>Delivery and payment options are confirmed with you on WhatsApp.</p><button className="button button-dark checkout-button" onClick={checkout}>Continue on WhatsApp <ArrowUpRight size={17} /></button><span className="safe-note">No payment is collected on this website.</span></div>
              </>
            )}
          </aside>
        </div>
      )}

      {quickView && (
        <div className="overlay-layer modal-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickView(null) }}>
          <section className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title">
            <button className="close-button modal-close" aria-label="Close product details" onClick={() => setQuickView(null)}><X size={21} /></button>
            <div className="quick-image"><img src={quickView.image} alt={quickView.alt} /></div>
            <div className="quick-info"><p className="eyebrow">{quickView.category} · {quickView.badge ?? 'A good everyday'}</p><h2 id="quick-title">{quickView.name}</h2><p className="quick-price">{formatKes(quickView.price)}</p><p className="quick-description">{quickView.description}</p>
              <div className="color-row"><span>Available colours</span><div>{quickView.colors.map((color) => <span className="color-tag" key={color}>{color}</span>)}</div></div>
              <div className="quick-quantity-row"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuickQuantity((quantity) => Math.max(1, quantity - 1))}><Minus size={13} /></button><span>{quickQuantity}</span><button aria-label="Increase quantity" onClick={() => setQuickQuantity((quantity) => quantity + 1)}><Plus size={13} /></button></div></div>
              <button className="button button-dark quick-add" onClick={() => { addToCart(quickView.id, quickQuantity); setQuickView(null); setCartOpen(true) }}>Add to your bag · {formatKes(quickView.price * quickQuantity)} <ShoppingBag size={16} /></button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App

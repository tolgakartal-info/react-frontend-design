import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';

export default function MessagesPage({screenSize}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Mehmet Demir',
      title: 'Evraklar Tamamlandı',
      preview: 'ABC projesi için istenen tüm evrakları sisteme yükledim...',
      time: '10:45',
      date: '20.09.2026',
      unread: true,
      avatar: 'M',
      color: 'bg-primary',
      chatHistory: [
        { id: 101, text: 'Merhaba Ahmet Bey, ABC projesi evrakları hazır mı?', isMe: false, senderName: 'Mehmet Demir', time: '10:30', date: '20.09.2026' },
        { id: 102, text: 'Selam Mehmet Bey, evet sistemden kontrol ediyorum şimdi.', isMe: true, senderName: 'Ahmet Yılmaz', time: '10:35', date: '20.09.2026' },
        { id: 103, text: 'Tüm idari ve teknik belgeleri yükledim, bilginize.', isMe: false, senderName: 'Mehmet Demir', time: '10:45', date: '20.09.2026' },
      ]
    },
    {
      id: 4,
      sender: 'Ar-Ge & Saha Ekibi 👥',
      title: 'Grup Sohbeti',
      preview: 'Ozan: Cihaz bağlantılarını tamamladık, teste geçebiliriz.',
      time: '11:15',
      date: '20.09.2026',
      unread: true,
      avatar: '👥',
      color: 'bg-info',
      // Yukarı scroll testleri için 15 adet örnek mesaj
      chatHistory: Array.from({ length: 15 }, (_, i) => ({
        id: 400 + i + 1,
        text: `Saha ve sistem test bildirimi #${i + 1}: Telemetri verileri kontrol ediliyor.`,
        isMe: i % 2 === 0,
        senderName: i % 2 === 0 ? 'Ahmet Yılmaz' : 'Ozan Öztürk',
        senderColor: i % 2 === 0 ? 'text-success' : 'text-warning',
        time: `11:${i < 10 ? '0' + i : i}`,
        date: '20.09.2026'
      }))
    },
    {
      id: 2,
      sender: 'Sistem Bildirimi',
      title: 'Yeni Cihaz Bağlandı',
      preview: 'Cihaz #108 başarıyla sisteme entegre edildi...',
      time: '14:20',
      date: '19.09.2026',
      unread: false,
      avatar: '⚙️',
      color: 'bg-warning',
      chatHistory: [
        { id: 201, text: 'Cihaz #108 ağa katıldı ve bağlantı kuruldu.', isMe: false, senderName: 'Sistem Bildirimi', time: '14:20', date: '19.09.2026' }
      ]
    },
    {
      id: 3,
      sender: 'Ayşe Kaya',
      title: 'Toplantı Hatırlatması',
      preview: 'Yarın saat 14:00\'teki proje durum değerlendirmesi...',
      time: '16:00',
      date: '18.09.2026',
      unread: false,
      avatar: 'A',
      color: 'bg-success',
      chatHistory: [
        { id: 301, text: 'Ahmet Bey iyi günler, toplantı saatini netleştirdik mi?', isMe: false, senderName: 'Ayşe Kaya', time: '15:50', date: '18.09.2026' },
        { id: 302, text: 'Evet Ayşe Hanım, yarın 14:00 uygundur.', isMe: true, senderName: 'Ahmet Yılmaz', time: '16:00', date: '18.09.2026' }
      ]
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const chatContainerRef = useRef(null);
  const isInitialLoadRef = useRef(true);
  const prevScrollHeightRef = useRef(0);

  // Gösterilecek sohbet geçmişini son `visibleCount` kadar dilimler
  const totalHistoryCount = selectedMessage?.chatHistory?.length || 0;
  const displayedHistory = selectedMessage?.chatHistory
    ? selectedMessage.chatHistory.slice(Math.max(totalHistoryCount - visibleCount, 0))
    : [];

  // İlk yüklemede veya sohbet geçişinde en alta kaydırır, üste mesaj eklendiğinde scroll konumunu korur
  useEffect(() => {
    if (!chatContainerRef.current) return;

    if (isInitialLoadRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      isInitialLoadRef.current = false;
    } else if (prevScrollHeightRef.current > 0) {
      const newScrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = newScrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = 0;
    }
  }, [displayedHistory.length]);

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setVisibleCount(10);
    isInitialLoadRef.current = true;
    setMessages(messages.map(m => m.id === msg.id ? { ...m, unread: false } : m));
  };

  // Sohbet kutusu en üste geldiğinde eski 10 mesajı yükler
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight } = chatContainerRef.current;

    if (scrollTop === 0 && visibleCount < totalHistoryCount) {
      prevScrollHeightRef.current = scrollHeight;
      setVisibleCount(prev => prev + 10);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('tr-TR');

    const newChatMessage = {
      id: Date.now(),
      text: replyText,
      isMe: true,
      senderName: 'Ahmet Yılmaz',
      senderColor: 'text-success',
      time: timeStr,
      date: dateStr
    };

    const updatedHistory = [...selectedMessage.chatHistory, newChatMessage];
    const updatedSelected = { ...selectedMessage, chatHistory: updatedHistory, preview: replyText, time: timeStr };

    setSelectedMessage(updatedSelected);
    setMessages(messages.map(m => m.id === selectedMessage.id ? updatedSelected : m));
    setVisibleCount(prev => prev + 1);
    setReplyText('');

    // Yeni mesaj gönderildiğinde en alta yönlendir
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const filteredMessages = messages.filter(m => 
    m.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Mesajlar" 
        description="Gelen bildirimleri, grup sohbetlerini ve ekip içi mesajları takip edin." 
        icon="💬" 
      />

      <div className="bg-white rounded shadow-sm border overflow-hidden">
        <div className="row g-0">
          
          {/* Sol Kolon: Mesaj / Sohbet Listesi */}
          <div className="col-12 col-md-5 col-lg-4 border-end">
            <div className="p-3 border-bottom bg-light">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">🔍</span>
                <input
                  type="text"
                  className="form-control bg-white border-start-0"
                  placeholder="Sohbetlerde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="list-group list-group-flush overflow-auto" style={{ maxHeight: '600px' }}>
              {filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`list-group-item list-group-item-action p-3 border-bottom border-0 text-start transition-all ${
                      isSelected ? 'bg-primary bg-opacity-10 border-start border-primary border-4' : ''
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className={`${msg.color} text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0`}
                        style={{ width: '40px', height: '40px' }}
                      >
                        {msg.avatar}
                      </div>

                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <h6 className={`mb-0 text-truncate ${msg.unread ? 'fw-bold text-dark' : 'text-secondary'}`}>
                            {msg.sender}
                          </h6>
                          <small className="text-muted ms-2 flex-shrink-0" style={{ fontSize: screenSize }}>
                            {msg.time}
                          </small>
                        </div>
                        <p className="text-muted small mb-0 text-truncate" style={{ fontSize: screenSize }}>
                          {msg.preview}
                        </p>
                      </div>

                      {msg.unread && (
                        <span className="badge rounded-pill bg-primary p-1"> </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ Kolon: Balonlu Sohbet Alanı */}
          <div className="col-12 col-md-7 col-lg-8 d-flex flex-column" style={{ height: '500px' }}>
            {selectedMessage ? (
              <>
                {/* Sohbet Başlığı */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className={`${selectedMessage.color} text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5`}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {selectedMessage.avatar}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0">{selectedMessage.sender}</h6>
                      <small className="text-muted"
                      style={{fontSize:screenSize}}
                      >{selectedMessage.title}</small>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Tarzı Konuşma Balonları (Yukarı Scroll ile Yükleme) */}
                <div 
                  ref={chatContainerRef}
                  onScroll={handleScroll}
                  className="p-4 flex-grow-1 overflow-auto d-flex flex-column gap-3" 
                  style={{ backgroundColor: '#efeae2' }}
                >
                  {/* Eski Mesaj Yükleme Bilgilendirmesi */}
                  {visibleCount < totalHistoryCount ? (
                    <div className="text-center my-1">
                      <span className="badge bg-secondary opacity-75 fw-normal py-1 px-3" style={{ fontSize: screenSize }}>
                        ▲ Daha eski mesajlar için yukarı kaydırın ({totalHistoryCount - visibleCount} mesaj daha var)
                      </span>
                    </div>
                  ) : totalHistoryCount > 10 ? (
                    <div className="text-center my-1">
                      <span className="badge bg-light text-muted border fw-normal py-1 px-3" style={{ fontSize: screenSize }}>
                        Sohbetin başlangıcı
                      </span>
                    </div>
                  ) : null}

                  {displayedHistory.map((chat) => {
                    const bubbleBg = chat.isMe ? '#d9fdd3' : '#ffffff';
                    const textAlignClass = chat.isMe ? 'text-start' : 'text-end';
                    const nameColor = chat.senderColor || (chat.isMe ? 'text-success' : 'text-primary');

                    return (
                      <div
                        key={chat.id}
                        className={`d-flex flex-column ${chat.isMe ? 'align-items-end' : 'align-items-start'}`}
                      >
                        {/* Balon Konteyneri */}
                        <div
                          className="p-3 shadow-sm position-relative"
                          style={{ 
                            backgroundColor: bubbleBg,
                            color: '#111b21',
                            maxWidth: '75%', 
                            minWidth: '220px',
                            borderRadius: chat.isMe ? '12px 0px 12px 12px' : '0px 12px 12px 12px',
                            fontSize:screenSize,
                          }}
                        >
                          {/* Kulakçık Çıkıntısı */}
                          <div
                            className="position-absolute"
                            style={{
                              top: 0,
                              [chat.isMe ? 'right' : 'left']: '-8px',
                              width: '0',
                              height: '0',
                              borderTop: `10px solid ${bubbleBg}`,
                              fontSize:screenSize,
                              [chat.isMe ? 'borderRight' : 'borderLeft']: '8px solid transparent',
                            }}
                          />

                          {/* İsim Soyisim */}
                          <div 
                            className={`fw-bold mb-1 ${textAlignClass} ${nameColor}`}
                            style={{ fontSize:screenSize }}
                          >
                            {chat.senderName}
                          </div>

                          {/* Mesaj Metni */}
                          <div 
                            className={`mb-2 text-break ${textAlignClass}`} 
                            style={{ fontSize:screenSize, lineHeight: '1.4' }}
                          >
                            {chat.text}
                          </div>

                          {/* Alt Zaman / Tarih */}
                          <div 
                            className="d-flex justify-content-between align-items-center text-muted"
                            style={{ fontSize: screenSize }}
                          >
                            <span>{chat.time}</span>
                            <span>{chat.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Yanıt Yazma Barı */}
                <div className="p-3 border-top bg-white mt-auto">
                  <form onSubmit={handleSendReply} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bir mesaj yazın..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-success d-flex align-items-center gap-1 px-4">
                      <span>Gönder</span>
                      <span>➤</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted p-5">
                Sohbet başlatmak için soldan bir mesaj seçin.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

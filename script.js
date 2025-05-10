fetch('deyimler.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('searchBox').addEventListener('input', filterResults);
    document.getElementById('filterContext').addEventListener('change', filterResults);
    document.getElementById('filterLanguage').addEventListener('change', filterResults);
    function filterResults() {
      const searchText = document.getElementById('searchBox').value.toLowerCase();
      const context = document.getElementById('filterContext').value;
      const language = document.getElementById('filterLanguage').value;
      const filtered = data.filter(item => {
        const matchText = item.turkce_deyim.toLowerCase().includes(searchText) || item.ingilizce_deyim.toLowerCase().includes(searchText);
        const matchContext = context ? item.baglam === context : true;
        const matchLang = language === 'tr' ? item.turkce_deyim.toLowerCase().includes(searchText) : language === 'en' ? item.ingilizce_deyim.toLowerCase().includes(searchText) : true;
        return matchText && matchContext && matchLang;
      });
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      filtered.forEach(item => {
        resultsDiv.innerHTML += `<div class="result-item"><strong>${item.turkce_deyim}</strong> / <em>${item.ingilizce_deyim}</em><br>${item.turkce_aciklama} / ${item.ingilizce_aciklama}</div>`;
      });
    }
  });

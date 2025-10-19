(function(){
function navigate(target,dir='forward'){
  document.documentElement.classList.remove('page-in');
  document.documentElement.classList.add('page-out');
  setTimeout(()=>{window.location.href=target},420);
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-transition]');
  if(!a)return;
  e.preventDefault();
  navigate(a.getAttribute('href'));
});
window.addEventListener('load',()=>{
  document.documentElement.classList.add('page-in');
  const y=document.getElementById('year');
  if(y)y.textContent=new Date().getFullYear();
  if(document.body.classList.contains('notes-page'))initNotes();
});
function initNotes(){
  const key='rithwik-notes-v1';
  const area=document.getElementById('notearea');
  const save=document.getElementById('saveBtn');
  const clear=document.getElementById('clearBtn');
  if(!area)return;
  area.value=localStorage.getItem(key)||'';
  if(save)save.addEventListener('click',()=>{
    localStorage.setItem(key,area.value);
    save.textContent='Saved ✓';
    setTimeout(()=>save.textContent='Save',1200);
  });
  if(clear)clear.addEventListener('click',()=>{
    area.value='';localStorage.removeItem(key);
  });
  let t;area.addEventListener('input',()=>{
    clearTimeout(t);
    t=setTimeout(()=>localStorage.setItem(key,area.value),700);
  });
}})();
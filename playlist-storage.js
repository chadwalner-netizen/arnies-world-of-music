"use strict";
(() => {
 const KEY="arnie-playlists-v2", OLD="arnie-playlist", EVENT="arnie:playlist-change";
 let storage=null, memory=null;
 const norm=ids=>Array.isArray(ids)?[...new Set(ids.map(Number).filter(x=>Number.isInteger(x)&&x>0))]:[];
 const defaults=()=>({active:0,playlists:[0,1,2].map(i=>({name:`Playlist ${i+1}`,ids:[]}))});
 const clean=value=>{const s=defaults();if(value&&Array.isArray(value.playlists))s.playlists=s.playlists.map((p,i)=>({name:typeof value.playlists[i]?.name==="string"&&value.playlists[i].name.trim()?value.playlists[i].name.trim().slice(0,45):p.name,ids:norm(value.playlists[i]?.ids)}));s.active=Math.min(2,Math.max(0,Number.isInteger(value?.active)?value.active:0));return s};
 try{storage=window.localStorage;storage.getItem(KEY)}catch{}
 function readAll(){if(!storage)return clean(memory||defaults());try{const raw=storage.getItem(KEY);if(raw)return clean(JSON.parse(raw));const old=storage.getItem(OLD);if(old){const state=defaults();state.playlists[0].ids=norm(JSON.parse(old));storage.setItem(KEY,JSON.stringify(state));return state}}catch{}return defaults()}
 function writeAll(value){memory=clean(value);let available=!!storage;try{if(storage)storage.setItem(KEY,JSON.stringify(memory))}catch{storage=null;available=false}window.dispatchEvent(new CustomEvent(EVENT,{detail:{...read(),playlists:memory.playlists}}));return {...read(),available}}
 function read(){const state=readAll();return {ids:[...state.playlists[state.active].ids],active:state.active,playlists:state.playlists,available:!!storage}}
 function edit(fn){const state=readAll();fn(state);return writeAll(state)}
 function select(index){return edit(s=>{s.active=Math.min(2,Math.max(0,Number(index)||0))})}
 function rename(index,name){return edit(s=>{if(index>=0&&index<3&&String(name).trim())s.playlists[index].name=String(name).trim().slice(0,45)})}
 function add(id,index){const n=Number(id);const current=readAll();const target=index===undefined?current.active:Number(index);if(!Number.isInteger(n)||n<=0||target<0||target>2)return {...read(),added:false};if(current.playlists[target].ids.includes(n))return {...read(),added:false};current.playlists[target].ids.push(n);return {...writeAll(current),added:true}}
 function remove(id){return edit(s=>{const p=s.playlists[s.active];p.ids=p.ids.filter(x=>x!==Number(id))})}
 function move(id,direction){const s=readAll(),ids=s.playlists[s.active].ids,from=ids.indexOf(Number(id)),to=from+(direction<0?-1:1);if(from<0||to<0||to>=ids.length)return {...read(),moved:false};[ids[from],ids[to]]=[ids[to],ids[from]];return {...writeAll(s),moved:true}}
 function replace(ids){return edit(s=>{s.playlists[s.active].ids=norm(ids)})}
 function clear(){return replace([])}
 window.addEventListener("storage",e=>{if(e.key===KEY)window.dispatchEvent(new CustomEvent(EVENT,{detail:read()}))});
 window.ARNIE_PLAYLIST_STORAGE=Object.freeze({key:KEY,eventName:EVENT,read,readAll,select,rename,add,remove,move,replace,clear});
})();

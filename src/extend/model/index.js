import VModelLocal from './_local-model';
import VModelSession from './_session-model';
import VModelRemote from './_remote-model';

if (!window._VModelLocal) {
  window._VModelLocal = VModelLocal;
};

if (!window._VModelSession) {
  window._VModelSession = VModelSession;
};

if (!window._VModelRemote) {
  window._VModelRemote = VModelRemote;
};

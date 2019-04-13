// Native Javascript for Bootstrap 4 v2.0.26 | © dnp_theme | MIT-License
'use strict';

// globals
var globalObject = window,
  DOC = document,
  HTML = DOC.documentElement,
  body = 'body', // allow the library to be used in <head>
  // Native Javascript for Bootstrap Global Object
  BSN = (globalObject.BSN = {}),
  supports = (BSN.supports = []),
  // function toggle attributes
  dataToggle = 'data-toggle',
  dataDismiss = 'data-dismiss',
  // components
  stringModal = 'Modal',
  // options DATA API
  databackdrop = 'data-backdrop',
  dataKeyboard = 'data-keyboard',
  dataTarget = 'data-target',
  // option keys
  backdrop = 'backdrop',
  keyboard = 'keyboard',
  content = 'content',
  target = 'target',
  // box model
  offsetTop = 'offsetTop',
  offsetLeft = 'offsetLeft',
  scrollTop = 'scrollTop',
  scrollLeft = 'scrollLeft',
  clientWidth = 'clientWidth',
  clientHeight = 'clientHeight',
  offsetWidth = 'offsetWidth',
  offsetHeight = 'offsetHeight',
  innerWidth = 'innerWidth',
  // aria
  ariaHidden = 'aria-hidden',
  // event names
  clickEvent = 'click',
  keydownEvent = 'keydown',
  resizeEvent = 'resize',
  // originalEvents
  showEvent = 'show',
  shownEvent = 'shown',
  hideEvent = 'hide',
  hiddenEvent = 'hidden',
  // other
  getAttribute = 'getAttribute',
  setAttribute = 'setAttribute',
  hasAttribute = 'hasAttribute',
  createElement = 'createElement',
  appendChild = 'appendChild',
  innerHTML = 'innerHTML',
  preventDefault = 'preventDefault',
  getBoundingClientRect = 'getBoundingClientRect',
  querySelectorAll = 'querySelectorAll',
  getElementsByCLASSNAME = 'getElementsByClassName',
  getComputedStyle = 'getComputedStyle',
  indexOf = 'indexOf',
  parentNode = 'parentNode',
  length = 'length',
  toLowerCase = 'toLowerCase',
  Transition = 'Transition',
  Duration = 'Duration',
  Webkit = 'Webkit',
  style = 'style',
  push = 'push',
  contains = 'contains',
  showClass = 'show',
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
  // tooltip / popover
  tipPositions = /\b(top|bottom|left|right)+/,
  // modal
  modalOverlay = 0,
  fixedTop = 'fixed-top',
  fixedBottom = 'fixed-bottom',
  // transitionEnd since 2.0.4
  supportTransitions =
    Webkit + Transition in HTML[style] ||
    Transition[toLowerCase]() in HTML[style],
  transitionEndEvent =
    Webkit + Transition in HTML[style]
      ? Webkit[toLowerCase]() + Transition + 'End'
      : Transition[toLowerCase]() + 'end',
  transitionDuration =
    Webkit + Duration in HTML[style]
      ? Webkit[toLowerCase]() + Transition + Duration
      : Transition[toLowerCase]() + Duration,
  // set new focus element since 2.0.3
  setFocus = function(element) {
    element.focus ? element.focus() : element.setActive();
  },
  // class manipulation, since 2.0.0 requires polyfill.js
  addClass = function(element, classNAME) {
    element.classList.add(classNAME);
  },
  removeClass = function(element, classNAME) {
    element.classList.remove(classNAME);
  },
  hasClass = function(element, classNAME) {
    // since 2.0.0
    return element.classList[contains](classNAME);
  },
  // selection methods
  getElementsByClassName = function(element, classNAME) {
    // returns Array
    return [].slice.call(element[getElementsByCLASSNAME](classNAME));
  },
  queryElement = function(selector, parent) {
    var lookUp = parent ? parent : DOC;
    return typeof selector === 'object'
      ? selector
      : lookUp.querySelector(selector);
  },
  // event attach jQuery style / trigger  since 1.2.0
  on = function(element, event, handler) {
    element.addEventListener(event, handler, false);
  },
  off = function(element, event, handler) {
    element.removeEventListener(event, handler, false);
  },
  one = function(element, event, handler) {
    // one since 2.0.4
    on(element, event, function handlerWrapper(e) {
      handler(e);
      off(element, event, handlerWrapper);
    });
  },
  getTransitionDurationFromElement = function(element) {
    var duration = supportTransitions
      ? globalObject[getComputedStyle](element)[transitionDuration]
      : 0;
    duration = parseFloat(duration);
    duration =
      typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
    return duration; // we take a short offset to make sure we fire on the next frame after animation
  },
  emulateTransitionEnd = function(element, handler) {
    // emulateTransitionEnd since 2.0.4
    var called = 0,
      duration = getTransitionDurationFromElement(element);
    duration
      ? one(element, transitionEndEvent, function(e) {
          !called && handler(e), (called = 1);
        })
      : setTimeout(function() {
          !called && handler(), (called = 1);
        }, 17);
  },
  bootstrapCustomEvent = function(eventName, componentName, related) {
    var OriginalCustomEvent = new CustomEvent(
      eventName + '.bs.' + componentName
    );
    OriginalCustomEvent.relatedTarget = related;
    this.dispatchEvent(OriginalCustomEvent);
  },
  // tooltip / popover stuff
  getScroll = function() {
    // also Affix and ScrollSpy uses it
    return {
      y: globalObject.pageYOffset || HTML[scrollTop],
      x: globalObject.pageXOffset || HTML[scrollLeft],
    };
  };

BSN.version = '2.0.26';

/* Native Javascript for Bootstrap 4 | Modal
  -------------------------------------------*/

// MODAL DEFINITION
// ===============
var Modal = function(element, options) {
  // element can be the modal/triggering button

  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
  element = queryElement(element);

  // strings
  var component = 'modal',
    staticString = 'static',
    modalTrigger = 'modalTrigger',
    paddingRight = 'paddingRight',
    modalBackdropString = 'modal-backdrop',
    // determine modal, triggering element
    btnCheck =
      element[getAttribute](dataTarget) || element[getAttribute]('href'),
    checkModal = queryElement(btnCheck),
    modal = hasClass(element, component) ? element : checkModal;

  if (hasClass(element, component)) {
    element = null;
  } // modal is now independent of it's triggering element

  if (!modal) {
    return;
  } // invalidate

  // set options
  options = options || {};

  this[keyboard] =
    options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false'
      ? false
      : true;
  this[backdrop] =
    options[backdrop] === staticString ||
    modal[getAttribute](databackdrop) === staticString
      ? staticString
      : true;
  this[backdrop] =
    options[backdrop] === false || modal[getAttribute](databackdrop) === 'false'
      ? false
      : this[backdrop];
  this[content] = options[content]; // JavaScript only

  // bind, constants, event targets and other vars
  var self = this,
    relatedTarget = null,
    bodyIsOverflowing,
    scrollBarWidth,
    overlay,
    overlayDelay,
    // also find fixed-top / fixed-bottom items
    fixedItems = getElementsByClassName(HTML, fixedTop).concat(
      getElementsByClassName(HTML, fixedBottom)
    ),
    // private methods
    getWindowWidth = function() {
      var htmlRect = HTML[getBoundingClientRect]();
      return (
        globalObject[innerWidth] || htmlRect[right] - Math.abs(htmlRect[left])
      );
    },
    setScrollbar = function() {
      var bodyStyle = globalObject[getComputedStyle](DOC[body]),
        bodyPad = parseInt(bodyStyle[paddingRight], 10),
        itemPad;
      if (bodyIsOverflowing) {
        DOC[body][style][paddingRight] = bodyPad + scrollBarWidth + 'px';
        modal[style][paddingRight] = scrollBarWidth + 'px';
        if (fixedItems[length]) {
          for (var i = 0; i < fixedItems[length]; i++) {
            itemPad = globalObject[getComputedStyle](fixedItems[i])[
              paddingRight
            ];
            fixedItems[i][style][paddingRight] =
              parseInt(itemPad) + scrollBarWidth + 'px';
          }
        }
      }
    },
    resetScrollbar = function() {
      DOC[body][style][paddingRight] = '';
      modal[style][paddingRight] = '';
      if (fixedItems[length]) {
        for (var i = 0; i < fixedItems[length]; i++) {
          fixedItems[i][style][paddingRight] = '';
        }
      }
    },
    measureScrollbar = function() {
      // thx walsh
      var scrollDiv = DOC[createElement]('div'),
        widthValue;
      scrollDiv.className = component + '-scrollbar-measure'; // this is here to stay
      DOC[body][appendChild](scrollDiv);
      widthValue = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
      DOC[body].removeChild(scrollDiv);
      return widthValue;
    },
    checkScrollbar = function() {
      bodyIsOverflowing = DOC[body][clientWidth] < getWindowWidth();
      scrollBarWidth = measureScrollbar();
    },
    createOverlay = function() {
      modalOverlay = 1;

      var newOverlay = DOC[createElement]('div');
      overlay = queryElement('.' + modalBackdropString);

      if (overlay === null) {
        newOverlay[setAttribute]('class', modalBackdropString + ' fade');
        overlay = newOverlay;
        DOC[body][appendChild](overlay);
      }
    },
    removeOverlay = function() {
      overlay = queryElement('.' + modalBackdropString);
      if (overlay && overlay !== null && typeof overlay === 'object') {
        modalOverlay = 0;
        DOC[body].removeChild(overlay);
        overlay = null;
      }
      bootstrapCustomEvent.call(modal, hiddenEvent, component);
    },
    keydownHandlerToggle = function() {
      if (hasClass(modal, showClass)) {
        on(DOC, keydownEvent, keyHandler);
      } else {
        off(DOC, keydownEvent, keyHandler);
      }
    },
    resizeHandlerToggle = function() {
      if (hasClass(modal, showClass)) {
        on(globalObject, resizeEvent, self.update);
      } else {
        off(globalObject, resizeEvent, self.update);
      }
    },
    dismissHandlerToggle = function() {
      if (hasClass(modal, showClass)) {
        on(modal, clickEvent, dismissHandler);
      } else {
        off(modal, clickEvent, dismissHandler);
      }
    },
    // triggers
    triggerShow = function() {
      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();
      setFocus(modal);
      bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
    },
    triggerHide = function() {
      modal[style].display = '';
      element && setFocus(element);

      (function() {
        if (!getElementsByClassName(DOC, component + ' ' + showClass)[0]) {
          resetScrollbar();
          removeClass(DOC[body], component + '-open');
          overlay && hasClass(overlay, 'fade')
            ? (removeClass(overlay, showClass),
              emulateTransitionEnd(overlay, removeOverlay))
            : removeOverlay();

          resizeHandlerToggle();
          dismissHandlerToggle();
          keydownHandlerToggle();
        }
      })();
    },
    // handlers
    clickHandler = function(e) {
      var clickTarget = e[target];
      clickTarget =
        clickTarget[hasAttribute](dataTarget) ||
        clickTarget[hasAttribute]('href')
          ? clickTarget
          : clickTarget[parentNode];
      if (clickTarget === element && !hasClass(modal, showClass)) {
        modal[modalTrigger] = element;
        relatedTarget = element;
        self.show();
        e[preventDefault]();
      }
    },
    keyHandler = function(e) {
      if (self[keyboard] && e.which == 27 && hasClass(modal, showClass)) {
        self.hide();
      }
    },
    dismissHandler = function(e) {
      var clickTarget = e[target];
      if (
        hasClass(modal, showClass) &&
        (clickTarget[parentNode][getAttribute](dataDismiss) === component ||
          clickTarget[getAttribute](dataDismiss) === component ||
          (clickTarget === modal && self[backdrop] !== staticString))
      ) {
        self.hide();
        relatedTarget = null;
        e[preventDefault]();
      }
    };

  // public methods
  this.toggle = function() {
    if (hasClass(modal, showClass)) {
      this.hide();
    } else {
      this.show();
    }
  };
  this.show = function() {
    bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);

    // we elegantly hide any opened modal
    var currentOpen = getElementsByClassName(
      DOC,
      component + ' ' + showClass
    )[0];
    if (currentOpen && currentOpen !== modal) {
      modalTrigger in currentOpen &&
        currentOpen[modalTrigger][stringModal].hide();
      stringModal in currentOpen && currentOpen[stringModal].hide();
    }

    if (this[backdrop]) {
      !modalOverlay && createOverlay();
    }

    if (overlay && modalOverlay && !hasClass(overlay, showClass)) {
      overlay[offsetWidth]; // force reflow to enable trasition
      overlayDelay = getTransitionDurationFromElement(overlay);
      addClass(overlay, showClass);
    }

    setTimeout(
      function() {
        modal[style].display = 'block';

        checkScrollbar();
        setScrollbar();

        addClass(DOC[body], component + '-open');
        addClass(modal, showClass);
        modal[setAttribute](ariaHidden, false);

        hasClass(modal, 'fade')
          ? emulateTransitionEnd(modal, triggerShow)
          : triggerShow();
      },
      supportTransitions && overlay ? overlayDelay : 0
    );
  };
  this.hide = function() {
    bootstrapCustomEvent.call(modal, hideEvent, component);
    overlay = queryElement('.' + modalBackdropString);
    overlayDelay = overlay && getTransitionDurationFromElement(overlay);

    removeClass(modal, showClass);
    modal[setAttribute](ariaHidden, true);

    setTimeout(
      function() {
        hasClass(modal, 'fade')
          ? emulateTransitionEnd(modal, triggerHide)
          : triggerHide();
      },
      supportTransitions && overlay ? overlayDelay : 0
    );
  };
  this.setContent = function(content) {
    queryElement('.' + component + '-content', modal)[innerHTML] = content;
  };
  this.update = function() {
    if (hasClass(modal, showClass)) {
      checkScrollbar();
      setScrollbar();
    }
  };

  // init
  // prevent adding event handlers over and over
  // modal is independent of a triggering element
  if (!!element && !(stringModal in element)) {
    on(element, clickEvent, clickHandler);
  }
  if (!!self[content]) {
    self.setContent(self[content]);
  }
  if (element) {
    element[stringModal] = self;
    modal[modalTrigger] = element;
  } else {
    modal[stringModal] = self;
  }
};

// DATA API
supports[push]([stringModal, Modal, '[' + dataToggle + '="modal"]']);

/* Native Javascript for Bootstrap | Initialize Data API
  --------------------------------------------------------*/
var initializeDataAPI = function(constructor, collection) {
    for (var i = 0, l = collection[length]; i < l; i++) {
      new constructor(collection[i]);
    }
  },
  initCallback = (BSN.initCallback = function(lookUp) {
    lookUp = lookUp || DOC;
    for (var i = 0, l = supports[length]; i < l; i++) {
      initializeDataAPI(
        supports[i][1],
        lookUp[querySelectorAll](supports[i][2])
      );
    }
  });

// bulk initialize all components
DOC[body]
  ? initCallback()
  : on(DOC, 'DOMContentLoaded', function() {
      initCallback();
    });

module.exports = {
  Modal,
};

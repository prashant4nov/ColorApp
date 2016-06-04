/**
 * Created by Prashant Kumar on 6/2/16.
 */
var colorApp = {
    settings: {
        colors: 8,
        gridSize: 2
    },
    selectedColor: null,
    colorCodeLength: 6,
    maxColorsAllowed: 16777216,
    gridSizeMaxLimit: 100,
    colorsViewHeight: 300,
    colorsVisible: 0,
    colorsLimit: 1000,
    squareDimension: 50,
    enterKeyCode: 13,
    colorsDivId: 'colors-view',
    gridDivId: 'grid',
    gridSelectId: 'select-grid-size',
    colorsInputId: 'colors-count',
    colorClass: 'color',
    squareClass: 'square',
    selectedColorSpanId: 'selected-color',
    saveButtonId: 'save-button',
    init: function() {
        if(typeof(Storage)!=='undefined') {
            if (sessionStorage.gridSize) {
                this.settings.gridSize = Number(sessionStorage.gridSize);
            }
            if(sessionStorage.colors) {
                this.settings.colors = Number(sessionStorage.colors);
            }
        }
        this.colorsVisible = 0;
        this.renderGridSettingOption();
        this.renderColorsView();
        this.renderGridView();

        document.getElementById(this.gridSelectId).value=this.settings.gridSize;
        document.getElementById(this.colorsInputId).value=this.settings.colors;
    },
    renderColorsView: function() {
        var _this = this;
        var colorsEl = document.getElementById(this.colorsDivId);
        var addColors = this.settings.colors-this.colorsVisible;
        if(addColors>this.colorsLimit) {
            addColors=this.colorsLimit;
        }
        for(var i=1;i<=addColors;i++) {
            var colorEl = document.createElement('Div');
            colorEl.setAttribute('class', this.colorClass);
            colorEl.style.backgroundColor = this.getRandomColor();
            colorEl.addEventListener('click',
                function() {
                    _this.selectedColor = this.style.backgroundColor;
                    document.getElementById(_this.selectedColorSpanId).innerHTML = _this.selectedColor;
                }, false);
            colorsEl.appendChild(colorEl);
        }
        this.colorsVisible = this.colorsVisible+addColors;
    },
    renderGridView: function() {
        var _this = this;
        var gridEl = document.getElementById(this.gridDivId);
        gridEl.innerHTML="";
        var addSquares = Math.pow(this.settings.gridSize,2);
        for(var i=1;i<=addSquares;i++) {
            var square = document.createElement('Div');
            square.setAttribute('class', this.squareClass);
            square.addEventListener('click',
                function() {
                    this.style.backgroundColor=_this.selectedColor;
                }, false);
            gridEl.appendChild(square);
        }
        gridEl.style.width=this.settings.gridSize*this.squareDimension+'px';
    },
    addColors: function() {
        var colorsEl = document.getElementById(this.colorsDivId);
        var scrollHeight = colorsEl.scrollHeight;
        var scrollTop = colorsEl.scrollTop;
        if (scrollTop + this.colorsViewHeight >= scrollHeight) {
            this.renderColorsView();
        }
    },
    regenerateColors: function() {
        var colors = document.getElementById(this.colorsDivId).childNodes;
        for(var i=0;i<colors.length;i++) {
            colors[i].style.backgroundColor=this.getRandomColor();
        }
    },
    getRandomColor: function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < this.colorCodeLength; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    },
    renderGridSettingOption: function() {
        var select = document.getElementById(this.gridSelectId);
        for(var i=2; i<=this.gridSizeMaxLimit;i++) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            select.appendChild(option);
        }
    },
    changeGrid: function() {
        var e = document.getElementById(this.gridSelectId);
        this.settings.gridSize = e.options[e.selectedIndex].value;
        this.renderGridView();
        this.saveGridSizeOption();
    },
    changeColorsView: function(colors) {
        if(this.validateUserInput(colors)===true) {
            if(this.settings.colors==colors) {
                return;
            }
            var colorsEl = document.getElementById(this.colorsDivId);
            colorsEl.innerHTML = '';
            this.colorsVisible = 0;
            this.settings.colors = colors;
            this.renderColorsView();
            this.saveColorsOption();
        }
    },
    validateUserInput: function(colors) {
        if (isNaN(colors)) {
            window.alert("Please enter number values.");
            return false;
        }
        if(colors>this.maxColorsAllowed) {
            window.alert("Max colors supported 16,777,216. Enter a smaller value.");
            return false;
        }
        if(colors<2) {
            window.alert("Please enter atleast 2 colors.");
            return false;
        }
        return true;
    },
    onKeyUp: function(event) {
        if(event.keyCode==this.enterKeyCode) {
            document.getElementById(this.saveButtonId).click();
        }
    },
    saveGridSizeOption: function() {
        if(typeof(Storage)!=='undefined') {
            sessionStorage.gridSize=this.settings.gridSize;
        }
    },
    saveColorsOption: function() {
        if(typeof(Storage)!=='undefined') {
            sessionStorage.colors=this.settings.colors;
        }
    }
};

window.onload = function() {
    colorApp.init();
};

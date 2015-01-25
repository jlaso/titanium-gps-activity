module.exports = {

        animateGradient: function (view, options)
        {
            // in android isn't possible to include a view inside an object that is not a view
            if((Titanium.Platform.osname == "android") && (view.toString() !== '[object View]')){
                alert('Error on type calling animateGradient, called with '+view.toString());
                setTimeout(function(){
                    Titanium.Android.currentActivity.finish();
                },2500);
                return;
            }
            if(typeof(options) === "undefined"){
                options = {};
            }
            var timeout = options.timeout || 75;
            var colors = options.colors || ['#0000aa', '#000099'];
            /**
             * the view that host the activity bar
             */
            var linearGradient = Titanium.UI.createView({
                top: 0,
                left: 0,
                width: '100%', //Titanium.UI.FILL,
                height: '3dp',
                zIndex: 1000,
                backgroundGradient: {
                    type: 'linear',
                    startPoint: { x: '0%', y: '50%' },
                    endPoint: { x: '100%', y: '50%' },
                    colors: [
                        { color: 'pink', offset: 0.0},
                        { color: 'blue',   offset: 0.5 },
                        { color: 'pink', offset: 1.0 }
                    ]
                }
            });
            view.add(linearGradient);

            /**
             * auxiliary object to encapsulate variables
             */
            var gradient = {
                inc: 0.02,
                x: 0.05,
                colorIndex: 0,
                colors: colors,
                baseColor: view.backgroundColor,
                color: function(){
                    this.colorIndex = (this.colorIndex+1)%2;
                    return this.colors[this.colorIndex];
                }
            };

            /**
             * timer that simulates the activity though changing gradient color
             */
            var interval = setInterval(function(){
                if((gradient.x > 0.95) || (gradient.x<0.05)){
                    gradient.inc = -gradient.inc;
                }
                gradient.x += gradient.inc;
                //console.info("gradient.x="+gradient.x);
                linearGradient.backgroundGradient = {
                    type: 'linear',
                    startPoint: { x: '0%', y: '50%' },
                    endPoint: { x: '100%', y: '50%' },
                    colors: [
                        { color: gradient.baseColor, offset: 0.0},
                        { color: gradient.baseColor, offset: gradient.x-0.05},
                        { color: gradient.color(),   offset: gradient.x },
                        { color: gradient.baseColor, offset: gradient.x+0.05 },
                        { color: gradient.baseColor, offset: 1.0 }
                    ]
                };
            }, timeout);

            return {
                linearGradient: linearGradient,
                view: view,
                destroy: function(){
                    clearInterval(this.interval);
                    view.remove(linearGradient);
                },
                interval: interval
            };
        }

};

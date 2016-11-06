        var fetchAlbums;
        $(function(){

            var template = $('#album-template').get(0).textContent;
            var main = $('#main');
            //var card-list = $('<div class="card-list"></div>')
            var cardList = $('.card-list')
            var home = $('<h2>Witaj! Wyszukaj frazę aby rozpocząć.</h2>')
            //main.append(card-list)

            cardList.on('mousemove', function(event) {
                var element = cardList.get(0)
                var mouseX = event.pageX
                var pageWidth = document.body.getBoundingClientRect().width
                var middle = pageWidth / 2
                var deviation = Math.max(mouseX - middle) - Math.min(middle - mouseX)
                var multplier = element.scrollWidth / pageWidth

                cardList.stop().animate({
                    scrollLeft: cardList.scrollLeft() + Math.min(deviation, 300)
                }, {
                    duration: 800,
                    easing: 'linear'
                })

            })

            fetchAlbums = function (query) {


                var url = 'https://api.spotify.com/v1/search?q='+query+'&type=album&market=PL';
                $.getJSON(url).then( function(response) {
                    var albums = response.albums.items.map( function(album){
                        return renderAlbumCard(album, template)
                    })
                cardList.append(albums)
                //console.log(albums, response.albums.items)
                });
            }

            var query = ' ';
            fetchAlbums(query)

            function renderAlbumCard(data, template) {
                var $element = $(template)
                $element.find('img').attr('src' ,data.images[0].url )
                $element.find('.card-title').text( data.name )
                $element.find('.card-artist').text( data.artists[0].name )
                return $element;
            }

            $('.search-form').on('submit', function(event) {
                event.preventDefault();
                //$('h2').remove()
                cardList.empty()
                var query = $('.form-control').val()
                fetchAlbums(query)
                $('.search-form')[0].reset();
            })

            $('#home').on('click', function() {
                cardList.empty()
                cardList.append(home)
            })

        })

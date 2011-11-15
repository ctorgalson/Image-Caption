(function($) {
  /**
   * Replaces each selected image that contains a title attribute with a div
   * containing:
   *
   *  --  the original image (including the link, if any, it was wrapped in),
   *      wrapped in configurable html element,
   *  --  the title of the original image wrapped in a configurable html
   *      element.
   *
   * The replacement div receives the classes of the original image, but the
   * align, border, class and style attributes are removed from the image
   * itself.
   *
   * @author Christopher Torgalson <bedlamhotel@gmail.com>
   * @param options overrides
   *        Overrides for the default plugin settings. Currently contains the
   *        following properties:
   *
   *          --  (string) captionContainer
   *              jQuery-ready string for creating a new element to contain the
   *              caption
   *          --  (string) imageWrapper
   *              jQuery-ready string for creating a new element to contain the
   *              image (and link, if any)
   *          --  (string) captionWrapper
   *              jQuery-ready string for creating a new element to contain the
   *              above two elements
   *
   *        Any of the elements provided in settingsshould probably be inline
   *        elements such as span since the img element or its parent link may
   *        be contained in a <p> or other element that may not contain block-
   *        level elements.
   *
   * @example
   *        Given the following HTML:
   *
   *        <div class="foobar">
   *          <p class="p-foo">
   *            <a href="/foo/">
   *              <img alt="Image of foo"
   *                   align="left"
   *                   border="2"
   *                   class="image-foo"
   *                   height="100"
   *                   src="/foo/img/foo.jpg"
   *                   style="padding: 10px 5px;
   *                   title="This is a picture of foo"
   *                   width="100"/>
   *            </a>
   *          </p>
   *        </div>
   *
   *        Call the plugin like this:
   *
   *        $('.foobar img').imageCaption();
   *
   *        The original markup will be replaced by:
   *
   *        <div class="foobar">
   *          <p class="p-foo">
   *            <span class="re-imagecaption-wrapper image-foo">
   *              <span class="re-imagecaption-image">
   *                <a href="/foo/">
   *                  <img alt="Image of foo"
   *                       height="100"
   *                       src="/foo/img/foo.jpg"
   *                       title="This is a picture of foo"
   *                       width="100"/>
   *                </a>
   *              </span>
   *              <span class="re-imagecaption-caption">
   *                This is a picture of foo
   *              </span>
   *            </span>
   *          </p>
   *        </div>
   *
   * @version 1.1
   */
  $.fn.imageCaption = function(options) {  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      captionContainer: ('<span class="re-imagecaption-wrapper" />'),
      imageWrapper: ('<span class="re-imagecaption-image" />'),
      captionWrapper: ('<span class="re-imagecaption-caption" />')
    }, options);
    // Get to the business of caption-building:
    return this.each(function(i,e) {  
      // Find out if we have to do anything at all--this whole operation is
      // completely pointless if we have no image title!      
      if ($(e).attr('title') != '') {
        // Define the various objects we need to work with:
        var $current = $(e) // current element with certain attributes ruthlessly removed...
              .removeAttr('align')
              .removeAttr('border')
              .removeAttr('style'),
            $parent = $current.parent(), // current element's parent...
            $replace = $parent.is('a') ? $parent : $current, // current element plus its parent if and only if the parent is a link...            
            $caption = $(settings.captionContainer) // create new caption element and add the image (plus link) and caption into it...
              .addClass($current.attr('class'))
              .append($(settings.imageWrapper).html($replace.clone()))
              .append($(settings.captionWrapper).text($current.attr('title')));
        // Remove classes from the image:
        $caption.find('img').removeAttr('class');
        // Replace the original with the replacement:
        $replace.replaceWith($caption);
      }  
    });
  }; /* $.fn.imageCaption */
})(jQuery);
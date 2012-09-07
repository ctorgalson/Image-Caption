(function($) {
  /**
   * Replaces each selected image that contains a title attribute with a span
   * containing:
   *
   *  --  the original image (including the link, if any, it was wrapped in),
   *      wrapped in configurable html element,
   *  --  the title of the original image wrapped in a configurable html
   *      element.
   *
   * The replacement span receives the classes of the original image, but the
   * align, border, class and style attributes are removed from the image
   * itself.
   *
   * In circumstances where editors may be adding images with various sizes,
   * results will be much improved by ensuring images have a correct width
   * attribute.
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
   *        Any of the elements provided in settings should ideally be inline
   *        elements such as span since the img element or its parent link may
   *        be contained in a <p> or other element that may not contain block-
   *        level elements. The plugin defaults to using spans. Override it if
   *        you need to :)
   *
   * @example
   *        Given the following HTML:
   *
   *        <span class="foobar">
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
   *                   width="100" />
   *            </a>
   *          </p>
   *        </span>
   *
   *        Call the plugin like this:
   *
   *        $('.foobar img').imageCaption();
   *
   *        The original markup will be replaced by:
   *
   *        <span class="foobar">
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
   *        </span>
   *
   * @version 1.4
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
      var $imgs = $(e).attr('title');
      if ( $imgs !== '' && typeof $imgs != "undefined" ) { 
        // Define the various objects we need to work with:
        var $current = $(e), // current element with certain attributes ruthlessly removed...
            $width = $current.width(),
            $parent = $current.parent(), // current element's parent...
            $replace = $parent.is('a') ? $parent : $current, // current element plus its parent if and only if the parent is a link...            
            $caption = $(settings.captionContainer) // create new caption element and add the image (plus link) and caption into it...
              .addClass($current.attr('class'))
              .append($(settings.imageWrapper).html($replace.clone()))
              .append($(settings.captionWrapper).text($current.attr('title')));     
        // Add width to caption if we have it (and if you don't have it, you'll
        // want it, so make sure your editor/tool/user provides width and
        // height!).
        //
        // We do this in a conditional to avoid accidentally assigning a width
        // of zero which is very hard to deal with in CSS:
        if ($width > 0) {
          $caption.width($width);
        }
        // Once we've put it together, given it a height etc, find the image and
        //strip its classes etc:
        $caption
          .find('img')
          .removeAttr('class')
          .removeAttr('align')
          .removeAttr('border')
          .removeAttr('style')
          .parents('.re-imagecaption-wrapper'); // Get the collection back to the appropriate state for chaining...
        // Replace the original with the replacement:
        $replace.replaceWith($caption);
      }  
    });
  }; /* $.fn.imageCaption */
})(jQuery);

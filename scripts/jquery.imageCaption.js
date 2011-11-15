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
   * The replacement div receives the classes of the original image, plus those
   * of any parent p element, but the align, border, class and style attributes
   * are removed from the image itself.
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
   *          <div class="re-imagecaption-wrapper image-foo p-foo">
   *            <div class="re-imagecaption-image">
   *              <a href="/foo/">
   *                <img alt="Image of foo"
   *                   height="100"
   *                   src="/foo/img/foo.jpg"
   *                   title="This is a picture of foo"
   *                   width="100"/>
   *              </a>
   *            </div>
   *            <div class="re-imagecaption-caption">
   *              This is a picture of foo
   *            </div>
   *          </div>
   *        </div>
   *
   * @version 1.0
   */
  $.fn.imageCaption = function(options) {  
    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      captionContainer: ('<div class="re-imagecaption-wrapper" />'),
      imageWrapper: ('<div class="re-imagecaption-image" />'),
      captionWrapper: ('<div class="re-imagecaption-caption" />')
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
            $replaceParent = $replace.parent(), // the parent of whatever we've decided to replace...
            $caption = $(settings.captionContainer) // create new caption element and add the image (plus link) and caption into it...
              .addClass($current.attr('class'))
              .addClass($replaceParent.attr('class'))
              .append($(settings.imageWrapper).html($replace.clone()))
              .append($(settings.captionWrapper).text($current.attr('title')));
        // Remove classes from the image:
        $caption.find('img').removeAttr('class');
        // Find out if we're inside a 'p'--this will often happen in wysiwyg
        // environments--if we are, then we want to replace THAT too:
        if ($replaceParent.is('p')) {
          $replaceParent.replaceWith($caption);
        }
        // But otherwise, it's ok just to replace the image (including the parent
        // link if any):
        else {
          $replace.replaceWith($caption);
        }
      }  
    });
  }; /* $.fn.imageCaption */
})(jQuery);
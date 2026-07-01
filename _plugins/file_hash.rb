require "digest"

module Jekyll
  module FileHashFilter
    # Short content hash of a source-relative file path, for cache-busting
    # asset links. Deterministic on file content only (not build time), so
    # rebuilding with unchanged CSS produces byte-identical output.
    def file_hash(path)
      full_path = File.join(Dir.pwd, path)
      return "" unless File.exist?(full_path)

      Digest::MD5.hexdigest(File.read(full_path))[0, 8]
    end
  end
end

Liquid::Template.register_filter(Jekyll::FileHashFilter)

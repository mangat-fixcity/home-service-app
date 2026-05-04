import { useState, useRef, useEffect } from "react";
import { Search, Clock, Zap, X } from "lucide-react";
import { useLocation } from "wouter";

interface SearchSuggestion {
  type: "category" | "provider";
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
}

interface SmartSearchProps {
  onSearch?: (query: string, category?: string) => void;
  placeholder?: string;
  showSearchHistory?: boolean;
}

const SERVICE_CATEGORIES = [
  { id: "cleaning", name: "Home Cleaning", icon: "🧹", aliases: ["cleaning", "clean", "sweep", "house clean"] },
  { id: "plumbing", name: "Plumbing", icon: "🔧", aliases: ["plumb", "pipe", "tap", "leak", "water"] },
  { id: "beauty", name: "Women's Beauty", icon: "💅", aliases: ["beauty", "salon", "haircut", "makeup", "hair"] },
  { id: "repair", name: "AC & Repair", icon: "⚡", aliases: ["ac", "repair", "air", "cool", "fan", "electric"] },
  { id: "painting", name: "Painting", icon: "🎨", aliases: ["paint", "wall", "color", "interior"] },
  { id: "carpentry", name: "Carpentry", icon: "🪵", aliases: ["carpenter", "wood", "furniture", "cabinet"] },
  { id: "men-salon", name: "Men's Salon", icon: "💇", aliases: ["barber", "salon", "haircut", "men"] },
  { id: "pest-control", name: "Pest Control", icon: "🦟", aliases: ["pest", "insect", "termite", "bug"] },
  { id: "appliance-repair", name: "Appliance Repair", icon: "🔩", aliases: ["appliance", "fridge", "washing", "microwave"] },
  { id: "electrician", name: "Electricians", icon: "⚙️", aliases: ["electrician", "wiring", "electrical", "light"] },
  { id: "laundry", name: "Laundry & Ironing", icon: "👕", aliases: ["laundry", "iron", "wash", "dry clean"] },
  { id: "movers", name: "Packers & Movers", icon: "📦", aliases: ["mover", "packer", "relocate", "move"] },
  { id: "carpet-cleaning", name: "Carpet Cleaning", icon: "🧶", aliases: ["carpet", "sofa", "fabric", "rug"] },
  { id: "photography", name: "Photography", icon: "📸", aliases: ["photo", "photographer", "picture", "wedding"] },
  { id: "car-wash", name: "Car Wash", icon: "🚗", aliases: ["car", "wash", "auto", "detail", "vehicle"] },
  { id: "pet-care", name: "Pet Grooming", icon: "🐕", aliases: ["pet", "dog", "groom", "veterinary", "cat"] },
  { id: "handyman", name: "Handyman", icon: "🔨", aliases: ["handyman", "fix", "repair", "maintenance"] },
  { id: "fitness", name: "Yoga & Fitness", icon: "🧘", aliases: ["yoga", "fitness", "gym", "trainer", "exercise"] },
  { id: "tutoring", name: "Tutoring", icon: "📚", aliases: ["tutor", "coaching", "classes", "education", "school"] },
  { id: "massage", name: "Massage & Spa", icon: "💆", aliases: ["massage", "spa", "relaxation", "therapy"] },
  { id: "chef", name: "Chef Services", icon: "👨‍🍳", aliases: ["chef", "cook", "catering", "food"] },
  { id: "gardening", name: "Gardening", icon: "🌱", aliases: ["garden", "plant", "landscaping", "lawn"] },
  { id: "babysitting", name: "Babysitting", icon: "👶", aliases: ["babysit", "childcare", "nanny", "kids"] },
  { id: "tech-repair", name: "Tech Repair", icon: "📱", aliases: ["tech", "phone", "computer", "repair", "laptop"] },
];

const MOCK_PROVIDERS = [
  { id: "1", name: "Rajesh Kumar", category: "plumbing", service: "Plumbing Expert" },
  { id: "2", name: "Sunita Sharma", category: "cleaning", service: "Deep Cleaning" },
  { id: "3", name: "Classic Cuts Salon", category: "beauty", service: "Women's Salon" },
  { id: "4", name: "Amit Electricals", category: "repair", service: "AC Repair" },
];

export default function SmartSearch({ onSearch, placeholder = "Search for services or professionals...", showSearchHistory = true }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(JSON.parse(localStorage.getItem("searchHistory") || "[]").slice(0, 5));
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  // Fuzzy matching function
  const fuzzyMatch = (searchTerm: string, target: string): number => {
    const term = searchTerm.toLowerCase();
    const targetLower = target.toLowerCase();
    
    if (targetLower.startsWith(term)) return 3; // Prefix match = highest priority
    if (targetLower.includes(term)) return 2; // Substring match
    
    // Levenshtein distance for fuzzy matching
    let matches = 0;
    let targetIdx = 0;
    for (let i = 0; i < term.length; i++) {
      while (targetIdx < targetLower.length && targetLower[targetIdx] !== term[i]) {
        targetIdx++;
      }
      if (targetIdx < targetLower.length) {
        matches++;
        targetIdx++;
      }
    }
    
    return matches > term.length * 0.6 ? 1 : 0; // Fuzzy match
  };

  // Generate suggestions
  const generateSuggestions = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      if (showSearchHistory && searchHistory.length > 0) {
        setSuggestions(
          searchHistory.map(item => ({
            type: "category" as const,
            id: item,
            title: item,
            icon: "🕐"
          }))
        );
      }
      return;
    }

    const categoryMatches: SearchSuggestion[] = [];
    const providerMatches: SearchSuggestion[] = [];

    // Search categories with fuzzy matching
    SERVICE_CATEGORIES.forEach(cat => {
      const nameScore = fuzzyMatch(searchTerm, cat.name);
      const aliasScore = Math.max(...cat.aliases.map(alias => fuzzyMatch(searchTerm, alias)));
      const score = Math.max(nameScore, aliasScore);

      if (score > 0) {
        categoryMatches.push({
          type: "category",
          id: cat.id,
          title: cat.name,
          subtitle: `${cat.icon} Browse all professionals`,
          icon: cat.icon
        });
      }
    });

    // Search providers
    MOCK_PROVIDERS.forEach(provider => {
      const nameScore = fuzzyMatch(searchTerm, provider.name);
      const serviceScore = fuzzyMatch(searchTerm, provider.service);
      const score = Math.max(nameScore, serviceScore);

      if (score > 0) {
        providerMatches.push({
          type: "provider",
          id: provider.id,
          title: provider.name,
          subtitle: provider.service,
          icon: "⭐"
        });
      }
    });

    // Sort by relevance and combine
    const allSuggestions = [
      ...categoryMatches.sort((a, b) => b.title.length - a.title.length),
      ...providerMatches
    ].slice(0, 8);

    setSuggestions(allSuggestions);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    generateSuggestions(query);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === "category") {
      // Save to history
      const newHistory = [suggestion.title, ...searchHistory.filter(h => h !== suggestion.title)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      // Navigate to services filtered by category - use hard navigation
      window.location.href = `/services?category=${suggestion.id}`;
    } else if (suggestion.type === "provider") {
      // Navigate to provider profile - use hard navigation
      window.location.href = `/profile/${suggestion.id}`;
    }
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    // Save to history
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    // Try to find matching category with simpler logic
    const queryLower = query.toLowerCase();
    const matchedCategory = SERVICE_CATEGORIES.find(cat => {
      // Check if category name starts with query
      if (cat.name.toLowerCase().startsWith(queryLower)) return true;
      // Check if any alias starts with query
      if (cat.aliases.some(alias => alias.toLowerCase().startsWith(queryLower))) return true;
      // Check if category name contains query
      if (cat.name.toLowerCase().includes(queryLower)) return true;
      // Check if any alias contains query
      if (cat.aliases.some(alias => alias.toLowerCase().includes(queryLower))) return true;
      return false;
    });

    // Call onSearch callback or navigate
    if (onSearch) {
      onSearch(query);
    } else {
      if (matchedCategory) {
        // Use window.location for hard navigation to ensure URL is read
        window.location.href = `/services?category=${matchedCategory.id}`;
      } else {
        // No category match, do general search
        window.location.href = `/services?search=${encodeURIComponent(query)}`;
      }
    }
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full h-12 pl-11 pr-10 rounded-lg border-2 border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm hover:border-primary/40"
          data-testid="search-input"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-clear-search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || (query === "" && searchHistory.length > 0)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary/20 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Categories Section */}
          {suggestions.filter(s => s.type === "category").length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted/50 sticky top-0">
                CATEGORIES
              </div>
              {suggestions
                .filter(s => s.type === "category")
                .map((suggestion, idx) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 border-b last:border-b-0 ${
                      selectedIndex === idx ? "bg-primary/10" : ""
                    }`}
                    data-testid={`suggestion-${suggestion.id}`}
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.subtitle}</p>
                    </div>
                    <Zap className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
            </>
          )}

          {/* Providers Section */}
          {suggestions.filter(s => s.type === "provider").length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted/50 sticky top-0">
                PROFESSIONALS
              </div>
              {suggestions
                .filter(s => s.type === "provider")
                .map((suggestion, idx) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 border-b ${
                      selectedIndex === suggestions.filter(s => s.type === "category").length + idx
                        ? "bg-primary/10"
                        : ""
                    }`}
                    data-testid={`suggestion-provider-${suggestion.id}`}
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.subtitle}</p>
                    </div>
                  </button>
                ))}
            </>
          )}

          {/* Search History */}
          {query === "" && searchHistory.length > 0 && (
            <>
              <div className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted/50 sticky top-0">
                RECENT SEARCHES
              </div>
              {searchHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item);
                    setShowSuggestions(true);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 border-b last:border-b-0"
                  data-testid={`history-${idx}`}
                >
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-foreground flex-1">{item}</p>
                  <X className="w-4 h-4 text-muted-foreground opacity-0 hover:opacity-100" />
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
